define ['underscore'], (_) ->
  class CommanderRequestFragment
    m_requestParams: {}

    constructor: ->
      @m_requestParams = new Object()

    addParameter: (name, value) ->
      @doAddParameter name, value

    doAddParameter: (name, value) ->
      curValue = @m_requestParams[name]
      unless curValue?
        @m_requestParams[name] = value
        return

      unless _.isArray curValue
        arr = new Array()
        arr.push @m_requestParams[name]
        arr.push value
        @m_requestParams[name] = arr
        return

      @m_requestParams[name].push value
      null

    doSetParameter: (name, value) ->
      @m_requestParams[name] = value

    getMultiValuedParameter: (name) ->
      result = @m_requestParams[name]

      unless result?
        return null

      unless _.isArray result
        return [result]

      result

    getParameter: (name) ->
      @m_requestParams[name]

    getParameters: ->
      @m_requestParams

    getRequestParams: ->
      @m_requestParams

    getStringParameter: (name) ->
      result = @m_requestParams[name]

      unless _.isString result
        return null

      result

    setParameter: (name, value) ->
      if value instanceof CommanderRequestFragment
        @doSetParameter name, value
        return null

      unless value?
        @doSetParameter name, ''
        return null

      if _.isBoolean value
        @doSetParameter name, value ? '1':'0'
        return null

      if value?
        @doSetParameter name, value.toString()

  class FindObjectFilter extends CommanderRequestFragment
    ###
    @Operator: [
      'and'
      'between'
      'contains'
      'equals'
      'greaterOrEqual'
      'greaterThan'
      'in'
      'isNotNull'
      'isNull'
      'lessOrEqual'
      'lessThan'
      'like'
      'not'
      'notEqual'
      'notLike'
      'or'
    ]
    ###

    constructor: ->
      super

    addFilter: (filters...) ->
      for f in filters
        @addParameter 'filter', f
      @

    nullToEmpty: (str) ->
      unless str?
        console.log 'nullToEmpty'
        return ''
      str

    setOperand1: (operand1) ->
      @setParameter 'operand1', @nullToEmpty operand1
      @

    setOperand2: (operand2) ->
      @setParameter 'operand2', @nullToEmpty operand2
      @

    setOperator: (operator) ->
      @setParameter 'operator', operator

    setPropertyName: (propertyName) ->
      @setParameter 'propertyName', propertyName
      @

    setDateOperand1: (operand1) ->
      @setParameter 'displayOperand1', @nullToEmpty operand1
      @

    setDateOperand2: (operand2) ->
      @setParameter 'displayOperand2', @nullToEmpty operand2
      @

  class ParsedString
    str: ''
    idx: 0

    constructor: (s)->
      @str = s
      @idx = 0

    check: (c, complaint) ->
      #if @str.charAt(@idx) != c
        #console.log complaint + ' at ' + @str.substring @idx
      ++@idx

  class ContainsFilter extends FindObjectFilter
    constructor: (propertyName, operand) ->
      super
      @setOperator 'contains'
      @setPropertyName propertyName
      @setOperand1 operand

  class EqualsFilter extends FindObjectFilter
    constructor: (propertyName, operand) ->
      super
      @setOperator 'equals'
      @setPropertyName propertyName
      @setOperand1 operand

  class NotEqualFilter extends FindObjectFilter
    constructor: (propertyName, operand) ->
      super
      @setOperator 'notEqual'
      @setPropertyName propertyName
      @setOperand1 operand

  class GreaterThanFilter extends FindObjectFilter
    constructor: (propertyName, operand) ->
      super
      @setOperator 'greaterThan'
      @setPropertyName propertyName
      @setOperand1 operand

  class FindObjectsFilterSerializer
    @FILTER_SEPARATOR: '-' # top level list of filters
    @ARGUMENT_SEPARATOR: '*'
    @LIST_BEGIN: '_'
    @LIST_CONTINUE: '-' # inside a list
    @LIST_END: '_'
    @ESCAPE: '.'

    @AbbreviatedOperator:
      and: "an"
      between: "bt"
      contains: "ct"
      equals: "eq"
      greaterOrEqual: "ge"
      greaterThan: "gt"
      in: "in"
      isNotNull: "nN"
      isNull: "iN"
      lessOrEqual: "le"
      lessThan: "lt"
      like: "lk"
      not: "nt"
      notEqual: "ne"
      notLike: "nl"
      or: "or"
      ENCODED_LENGTH: 2

    @Intrinsic:
      abortedBy:         "_aB"
      abortStatus:       "_aS"
      createTime:        "_cT"
      credentialName:    "_cN"
      directoryName:     "_dN"
      elapsedTime:       "_eT"
      errorCode:         "_eC"
      errorMessage:      "_eM"
      finish:            "_fn"
      jobId:             "_jI"
      jobName:           "_jN"
      lastModifiedBy:    "_lM"
      launchedByUser:    "_lB"
      licenseWaitTime:   "_lW"
      liveProcedure:     "_lP"
      liveSchedule:      "_lS"
      modifyTime:        "_mT"
      outcome:           "_oc"
      owner:             "_ow"
      priority:          "_pr"
      procedureName:     "_pc"
      projectName:       "_pj"
      resourceWaitTime:  "_rW"
      runAsUser:         "_rU"
      scheduleName:      "_sc"
      start:             "_sr"
      stateName:         "_sN"
      status:            "_st"
      totalWaitTime:     "_tW"
      workspaceWaitTime: "_wW"

    @encodeOperator: (operator) ->
      @AbbreviatedOperator[operator]

    @encodePropertyName: (propertyName) ->
      @Intrinsic[propertyName]

    @decodeOperator: (operator) ->
      for key, value of @AbbreviatedOperator
        if value == operator
          return key
      null

    @decodePropertyName: (propertyName) ->
      for key, value of @Intrinsic
        if value == propertyName
          return key
      null

    @serializeString: (sb, s) ->
      for c in s
        switch c
          when @FILTER_SEPARATOR, @ARGUMENT_SEPARATOR, @LIST_BEGIN, @ESCAPE
            sb.push @ESCAPE
            sb.push c
            break
          else
            sb.push c
            break

    @deserializeString: (s) ->
      sb = new Array()
      begin = s.idx

      while s.idx < s.str.length
        c = s.str.charAt s.idx

        switch c
          when @ARGUMENT_SEPARATOR, @LIST_CONTINUE, @LIST_END
            return sb.join ''

          when @ESCAPE
            #if s.idx == s.str.length - 1
              #console.log 'Malformed escape at ' + s.str.substring begin

            c = s.str.charAt ++s.idx
            sb.push c
            ++s.idx
            break

          else
            sb.push c
            ++s.idx
            break
      sb.join ''


    @serialize: (filters) ->
      sb = new Array()
      for f in filters
        if sb.length > 0
          sb.push @FILTER_SEPARATOR
        @serialize2 sb, f
      sb.join('')

    @serialize2: (sb, f) ->
      unless f instanceof FindObjectFilter
        @serializeString sb, f
        return null

      op = f.getParameter 'operator'

      sb.push @encodeOperator op

      switch op
        when 'and', 'or', 'not'
          sb.push @LIST_BEGIN
          filters = f.getMultiValuedParameter 'filter'
          unless filters?
            sb.push @LIST_END
            break

          first = true
          for object in filters
            #unless object instanceof FindObjectFilter
              #console.log 'unexpected object type'

            unless first
              sb.push @LIST_CONTINUE

            @serialize2 sb, object
            first = false

          sb.push @LIST_END

        else
          sb.push @ARGUMENT_SEPARATOR

          propertyName = f.getStringParameter 'propertyName'
          i_encoded = @encodePropertyName propertyName
          if i_encoded?
            @serializeString sb, i_encoded
          else
            @serializeString sb, propertyName

          if op == 'isNull' or op == 'isNotNull'
            break

          sb.push @ARGUMENT_SEPARATOR
          @serialize2 sb, f.getParameter 'operand1'

          unless op == 'between'
            break

          sb.push @ARGUMENT_SEPARATOR
          @serialize2 sb, f.getParameter 'operand2'
          break

    @deserialize: (serialized, filters) ->
      s = new ParsedString serialized

      while s.idx < serialized.length
        if s.idx > 0
          s.check @FILTER_SEPARATOR, 'Malformed filter list'

        filters.push @deserialize2 s
      filters

    @deserialize2: (s)->
      if s.str.charAt(s.idx) == @LIST_END
        return null

      #if s.str.length < (s.idx + @AbbreviatedOperator.ENCODED_LENGTH + 1)
        #console.log 'Malformed filter at ' + s.str.substring s.idx

      op = s.str.substring s.idx, s.idx + @AbbreviatedOperator.ENCODED_LENGTH
      s.idx += @AbbreviatedOperator.ENCODED_LENGTH

      o = @decodeOperator op

      #unless o?
        #console.log 'Couldn\'t locate operator "' + op + '"'

      f = new FindObjectFilter()
      f.setOperator o

      switch o
        when 'and', 'or', 'not'
          first = true

          s.check @LIST_BEGIN, 'Malformed "' + o + '" filter list'

          while true
            unless first
              ++s.idx
            child = @deserialize2 s

            if child?
              f.addFilter child

            first = false

            if s.str.charAt(s.idx) != @LIST_CONTINUE
              break

          s.check @LIST_END, 'Malformed "' + o + '" filter termination'
          break

        else
          s.check @ARGUMENT_SEPARATOR, 'Malformed "' + o + '" parameterName'

          arg = @deserializeString s
          intrinsic = @decodePropertyName arg

          if intrinsic?
            f.setPropertyName intrinsic
          else
            f.setPropertyName arg

          if o == 'isNull' or o == 'isNotNull'
            break

          s.check @ARGUMENT_SEPARATOR, 'Malformed "' + o + '" operand1'
          arg = @deserializeString s
          f.setOperand1 arg

          unless o == 'between'
            break

          s.check @ARGUMENT_SEPARATOR, 'Malformed "' + o + '" operand2'
          arg = @deserializeString s
          f.setOperand2 arg
          break
      f

  class FilterSerializer
    @QUICKSEARCH: 'qUiCkSeArCh'
    @RESOURCEAGENTSTATE: 'resourceAgentState'
    @RESOURCEDISABLED: 'resourceDisabled'
    @POOLS: 'pools'
    @STEPLIMIT: 'stepLimit'
    @PROXYHOSTNAME: 'proxyHostName'
    @HOSTNAME: 'hostName'

    @serialize: (filters) ->
      filterCollection = new Array()
      if filters['search']? and (filters['search'].length > 0)
        filterCollection.push new EqualsFilter(@QUICKSEARCH, filters['search'])

      down = filters['status-down']
      up = filters['status-up']

      if down and not up
        filterCollection.push new EqualsFilter(@RESOURCEAGENTSTATE, 'down')

      if up and not down
        filterCollection.push new EqualsFilter(@RESOURCEAGENTSTATE, 'alive')

      if filters['status'] is 'enabled'
        isEnabledFilter = new EqualsFilter @RESOURCEDISABLED, filters['status']
        filterCollection.push isEnabledFilter

      if filters['pools']? and (filters['pools'].length > 0)
        poolsFilter = new ContainsFilter @POOLS, filters['pools']
        filterCollection.push poolsFilter

      if filters['hosts']? and (filters['hosts'].length > 0)
        hostFilter = new EqualsFilter @HOSTNAME, filters['hosts']
        filterCollection.push hostFilter

      if filters['step-limit']? and (filters['step-limit'].length > 0)
        stepLimitFilter = new GreaterThanFilter @STEPLIMIT, filters['step-limit']
        filterCollection.push stepLimitFilter

      pa = filters['proxy-agent']
      if pa? and (pa.length > 0)
        if pa is '1'
          proxyFilter = new NotEqualFilter @PROXYHOSTNAME, ''
        else
          proxyFilter = new EqualsFilter @PROXYHOSTNAME, ''
        filterCollection.push proxyFilter

      serialized = FindObjectsFilterSerializer.serialize filterCollection

    @deserialize: (serialized) ->
      decoded = {
        'search': ''
        'status-down': false
        'status-up': false
        'status': ''
        'pools': ''
        'hosts': ''
        'step-limit': '0'
        'proxy-agent': '0'
      }
      deserialized = new Array()
      FindObjectsFilterSerializer.deserialize serialized, deserialized

      for d in deserialized
        propertyName = d.getStringParameter 'propertyName'

        switch propertyName
          when @QUICKSEARCH
            decoded['search'] = d.getStringParameter 'operand1'
            break
          when @RESOURCEAGENTSTATE
            if (d.getStringParameter 'operand1') is 'down'
              decoded['status-down'] = true
              decoded['status-up'] = false
            else if (d.getStringParameter 'operand1') is 'alive'
              decoded['status-down'] = false
              decoded['status-up'] = true
            break
          when @RESOURCEDISABLED
            decoded['status'] = d.getStringParameter 'operand1'
            break
          when @POOLS
            decoded['pools'] = d.getStringParameter 'operand1'
            break
          when @STEPLIMIT
            sl = d.getStringParameter 'operand1'
            decoded['step-limit'] = parseInt sl
            break
          when @PROXYHOSTNAME
            if (d.getStringParameter 'operator') is 'notEqual'
              decoded['proxy-agent'] = '1'
            else if (d.getStringParameter 'operator') is 'equals'
              decoded['proxy-agent'] = '0'
            break
          when @HOSTNAME
            decoded['hosts'] = d.getStringParameter 'operand1'
            break
      decoded

  FilterSerializer