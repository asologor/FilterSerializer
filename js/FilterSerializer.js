// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

define(['underscore'], function(_) {
  var CommanderRequestFragment, ContainsFilter, EqualsFilter, FilterSerializer, FindObjectFilter, FindObjectsFilterSerializer, GreaterThanFilter, NotEqualFilter, ParsedString;
  CommanderRequestFragment = (function() {
    CommanderRequestFragment.prototype.m_requestParams = {};

    function CommanderRequestFragment() {
      this.m_requestParams = new Object();
    }

    CommanderRequestFragment.prototype.addParameter = function(name, value) {
      return this.doAddParameter(name, value);
    };

    CommanderRequestFragment.prototype.doAddParameter = function(name, value) {
      var arr, curValue;
      curValue = this.m_requestParams[name];
      if (curValue == null) {
        this.m_requestParams[name] = value;
        return;
      }
      if (!_.isArray(curValue)) {
        arr = new Array();
        arr.push(this.m_requestParams[name]);
        arr.push(value);
        this.m_requestParams[name] = arr;
        return;
      }
      this.m_requestParams[name].push(value);
      return null;
    };

    CommanderRequestFragment.prototype.doSetParameter = function(name, value) {
      return this.m_requestParams[name] = value;
    };

    CommanderRequestFragment.prototype.getMultiValuedParameter = function(name) {
      var result;
      result = this.m_requestParams[name];
      if (result == null) {
        return null;
      }
      if (!_.isArray(result)) {
        return [result];
      }
      return result;
    };

    CommanderRequestFragment.prototype.getParameter = function(name) {
      return this.m_requestParams[name];
    };

    CommanderRequestFragment.prototype.getParameters = function() {
      return this.m_requestParams;
    };

    CommanderRequestFragment.prototype.getRequestParams = function() {
      return this.m_requestParams;
    };

    CommanderRequestFragment.prototype.getStringParameter = function(name) {
      var result;
      result = this.m_requestParams[name];
      if (!_.isString(result)) {
        return null;
      }
      return result;
    };

    CommanderRequestFragment.prototype.setParameter = function(name, value) {
      if (value instanceof CommanderRequestFragment) {
        this.doSetParameter(name, value);
        return null;
      }
      if (value == null) {
        this.doSetParameter(name, '');
        return null;
      }
      if (_.isBoolean(value)) {
        this.doSetParameter(name, value != null ? value : {
          '1': '0'
        });
        return null;
      }
      if (value != null) {
        return this.doSetParameter(name, value.toString());
      }
    };

    return CommanderRequestFragment;

  })();
  FindObjectFilter = (function(_super) {
    __extends(FindObjectFilter, _super);

    /*
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
    */


    function FindObjectFilter() {
      FindObjectFilter.__super__.constructor.apply(this, arguments);
    }

    FindObjectFilter.prototype.addFilter = function() {
      var f, filters, _i, _len;
      filters = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = filters.length; _i < _len; _i++) {
        f = filters[_i];
        this.addParameter('filter', f);
      }
      return this;
    };

    FindObjectFilter.prototype.nullToEmpty = function(str) {
      if (str == null) {
        console.log('nullToEmpty');
        return '';
      }
      return str;
    };

    FindObjectFilter.prototype.setOperand1 = function(operand1) {
      this.setParameter('operand1', this.nullToEmpty(operand1));
      return this;
    };

    FindObjectFilter.prototype.setOperand2 = function(operand2) {
      this.setParameter('operand2', this.nullToEmpty(operand2));
      return this;
    };

    FindObjectFilter.prototype.setOperator = function(operator) {
      return this.setParameter('operator', operator);
    };

    FindObjectFilter.prototype.setPropertyName = function(propertyName) {
      this.setParameter('propertyName', propertyName);
      return this;
    };

    FindObjectFilter.prototype.setDateOperand1 = function(operand1) {
      this.setParameter('displayOperand1', this.nullToEmpty(operand1));
      return this;
    };

    FindObjectFilter.prototype.setDateOperand2 = function(operand2) {
      this.setParameter('displayOperand2', this.nullToEmpty(operand2));
      return this;
    };

    return FindObjectFilter;

  })(CommanderRequestFragment);
  ParsedString = (function() {
    ParsedString.prototype.str = '';

    ParsedString.prototype.idx = 0;

    function ParsedString(s) {
      this.str = s;
      this.idx = 0;
    }

    ParsedString.prototype.check = function(c, complaint) {
      return ++this.idx;
    };

    return ParsedString;

  })();
  ContainsFilter = (function(_super) {
    __extends(ContainsFilter, _super);

    function ContainsFilter(propertyName, operand) {
      ContainsFilter.__super__.constructor.apply(this, arguments);
      this.setOperator('contains');
      this.setPropertyName(propertyName);
      this.setOperand1(operand);
    }

    return ContainsFilter;

  })(FindObjectFilter);
  EqualsFilter = (function(_super) {
    __extends(EqualsFilter, _super);

    function EqualsFilter(propertyName, operand) {
      EqualsFilter.__super__.constructor.apply(this, arguments);
      this.setOperator('equals');
      this.setPropertyName(propertyName);
      this.setOperand1(operand);
    }

    return EqualsFilter;

  })(FindObjectFilter);
  NotEqualFilter = (function(_super) {
    __extends(NotEqualFilter, _super);

    function NotEqualFilter(propertyName, operand) {
      NotEqualFilter.__super__.constructor.apply(this, arguments);
      this.setOperator('notEqual');
      this.setPropertyName(propertyName);
      this.setOperand1(operand);
    }

    return NotEqualFilter;

  })(FindObjectFilter);
  GreaterThanFilter = (function(_super) {
    __extends(GreaterThanFilter, _super);

    function GreaterThanFilter(propertyName, operand) {
      GreaterThanFilter.__super__.constructor.apply(this, arguments);
      this.setOperator('greaterThan');
      this.setPropertyName(propertyName);
      this.setOperand1(operand);
    }

    return GreaterThanFilter;

  })(FindObjectFilter);
  FindObjectsFilterSerializer = (function() {
    function FindObjectsFilterSerializer() {}

    FindObjectsFilterSerializer.FILTER_SEPARATOR = '-';

    FindObjectsFilterSerializer.ARGUMENT_SEPARATOR = '*';

    FindObjectsFilterSerializer.LIST_BEGIN = '_';

    FindObjectsFilterSerializer.LIST_CONTINUE = '-';

    FindObjectsFilterSerializer.LIST_END = '_';

    FindObjectsFilterSerializer.ESCAPE = '.';

    FindObjectsFilterSerializer.AbbreviatedOperator = {
      and: "an",
      between: "bt",
      contains: "ct",
      equals: "eq",
      greaterOrEqual: "ge",
      greaterThan: "gt",
      "in": "in",
      isNotNull: "nN",
      isNull: "iN",
      lessOrEqual: "le",
      lessThan: "lt",
      like: "lk",
      not: "nt",
      notEqual: "ne",
      notLike: "nl",
      or: "or",
      ENCODED_LENGTH: 2
    };

    FindObjectsFilterSerializer.Intrinsic = {
      abortedBy: "_aB",
      abortStatus: "_aS",
      createTime: "_cT",
      credentialName: "_cN",
      directoryName: "_dN",
      elapsedTime: "_eT",
      errorCode: "_eC",
      errorMessage: "_eM",
      finish: "_fn",
      jobId: "_jI",
      jobName: "_jN",
      lastModifiedBy: "_lM",
      launchedByUser: "_lB",
      licenseWaitTime: "_lW",
      liveProcedure: "_lP",
      liveSchedule: "_lS",
      modifyTime: "_mT",
      outcome: "_oc",
      owner: "_ow",
      priority: "_pr",
      procedureName: "_pc",
      projectName: "_pj",
      resourceWaitTime: "_rW",
      runAsUser: "_rU",
      scheduleName: "_sc",
      start: "_sr",
      stateName: "_sN",
      status: "_st",
      totalWaitTime: "_tW",
      workspaceWaitTime: "_wW"
    };

    FindObjectsFilterSerializer.encodeOperator = function(operator) {
      return this.AbbreviatedOperator[operator];
    };

    FindObjectsFilterSerializer.encodePropertyName = function(propertyName) {
      return this.Intrinsic[propertyName];
    };

    FindObjectsFilterSerializer.decodeOperator = function(operator) {
      var key, value, _ref;
      _ref = this.AbbreviatedOperator;
      for (key in _ref) {
        value = _ref[key];
        if (value === operator) {
          return key;
        }
      }
      return null;
    };

    FindObjectsFilterSerializer.decodePropertyName = function(propertyName) {
      var key, value, _ref;
      _ref = this.Intrinsic;
      for (key in _ref) {
        value = _ref[key];
        if (value === propertyName) {
          return key;
        }
      }
      return null;
    };

    FindObjectsFilterSerializer.serializeString = function(sb, s) {
      var c, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = s.length; _i < _len; _i++) {
        c = s[_i];
        switch (c) {
          case this.FILTER_SEPARATOR:
          case this.ARGUMENT_SEPARATOR:
          case this.LIST_BEGIN:
          case this.ESCAPE:
            sb.push(this.ESCAPE);
            sb.push(c);
            break;
          default:
            sb.push(c);
            break;
        }
      }
      return _results;
    };

    FindObjectsFilterSerializer.deserializeString = function(s) {
      var begin, c, sb;
      sb = new Array();
      begin = s.idx;
      while (s.idx < s.str.length) {
        c = s.str.charAt(s.idx);
        switch (c) {
          case this.ARGUMENT_SEPARATOR:
          case this.LIST_CONTINUE:
          case this.LIST_END:
            return sb.join('');
          case this.ESCAPE:
            c = s.str.charAt(++s.idx);
            sb.push(c);
            ++s.idx;
            break;
          default:
            sb.push(c);
            ++s.idx;
            break;
        }
      }
      return sb.join('');
    };

    FindObjectsFilterSerializer.serialize = function(filters) {
      var f, sb, _i, _len;
      sb = new Array();
      for (_i = 0, _len = filters.length; _i < _len; _i++) {
        f = filters[_i];
        if (sb.length > 0) {
          sb.push(this.FILTER_SEPARATOR);
        }
        this.serialize2(sb, f);
      }
      return sb.join('');
    };

    FindObjectsFilterSerializer.serialize2 = function(sb, f) {
      var filters, first, i_encoded, object, op, propertyName, _i, _len;
      if (!(f instanceof FindObjectFilter)) {
        this.serializeString(sb, f);
        return null;
      }
      op = f.getParameter('operator');
      sb.push(this.encodeOperator(op));
      switch (op) {
        case 'and':
        case 'or':
        case 'not':
          sb.push(this.LIST_BEGIN);
          filters = f.getMultiValuedParameter('filter');
          if (filters == null) {
            sb.push(this.LIST_END);
            break;
          }
          first = true;
          for (_i = 0, _len = filters.length; _i < _len; _i++) {
            object = filters[_i];
            if (!first) {
              sb.push(this.LIST_CONTINUE);
            }
            this.serialize2(sb, object);
            first = false;
          }
          return sb.push(this.LIST_END);
        default:
          sb.push(this.ARGUMENT_SEPARATOR);
          propertyName = f.getStringParameter('propertyName');
          i_encoded = this.encodePropertyName(propertyName);
          if (i_encoded != null) {
            this.serializeString(sb, i_encoded);
          } else {
            this.serializeString(sb, propertyName);
          }
          if (op === 'isNull' || op === 'isNotNull') {
            break;
          }
          sb.push(this.ARGUMENT_SEPARATOR);
          this.serialize2(sb, f.getParameter('operand1'));
          if (op !== 'between') {
            break;
          }
          sb.push(this.ARGUMENT_SEPARATOR);
          this.serialize2(sb, f.getParameter('operand2'));
          break;
      }
    };

    FindObjectsFilterSerializer.deserialize = function(serialized, filters) {
      var s;
      s = new ParsedString(serialized);
      while (s.idx < serialized.length) {
        if (s.idx > 0) {
          s.check(this.FILTER_SEPARATOR, 'Malformed filter list');
        }
        filters.push(this.deserialize2(s));
      }
      return filters;
    };

    FindObjectsFilterSerializer.deserialize2 = function(s) {
      var arg, child, f, first, intrinsic, o, op;
      if (s.str.charAt(s.idx) === this.LIST_END) {
        return null;
      }
      op = s.str.substring(s.idx, s.idx + this.AbbreviatedOperator.ENCODED_LENGTH);
      s.idx += this.AbbreviatedOperator.ENCODED_LENGTH;
      o = this.decodeOperator(op);
      f = new FindObjectFilter();
      f.setOperator(o);
      switch (o) {
        case 'and':
        case 'or':
        case 'not':
          first = true;
          s.check(this.LIST_BEGIN, 'Malformed "' + o + '" filter list');
          while (true) {
            if (!first) {
              ++s.idx;
            }
            child = this.deserialize2(s);
            if (child != null) {
              f.addFilter(child);
            }
            first = false;
            if (s.str.charAt(s.idx) !== this.LIST_CONTINUE) {
              break;
            }
          }
          s.check(this.LIST_END, 'Malformed "' + o + '" filter termination');
          break;
        default:
          s.check(this.ARGUMENT_SEPARATOR, 'Malformed "' + o + '" parameterName');
          arg = this.deserializeString(s);
          intrinsic = this.decodePropertyName(arg);
          if (intrinsic != null) {
            f.setPropertyName(intrinsic);
          } else {
            f.setPropertyName(arg);
          }
          if (o === 'isNull' || o === 'isNotNull') {
            break;
          }
          s.check(this.ARGUMENT_SEPARATOR, 'Malformed "' + o + '" operand1');
          arg = this.deserializeString(s);
          f.setOperand1(arg);
          if (o !== 'between') {
            break;
          }
          s.check(this.ARGUMENT_SEPARATOR, 'Malformed "' + o + '" operand2');
          arg = this.deserializeString(s);
          f.setOperand2(arg);
          break;
      }
      return f;
    };

    return FindObjectsFilterSerializer;

  })();
  FilterSerializer = (function() {
    function FilterSerializer() {}

    FilterSerializer.QUICKSEARCH = 'qUiCkSeArCh';

    FilterSerializer.RESOURCEAGENTSTATE = 'resourceAgentState';

    FilterSerializer.RESOURCEDISABLED = 'resourceDisabled';

    FilterSerializer.POOLS = 'pools';

    FilterSerializer.STEPLIMIT = 'stepLimit';

    FilterSerializer.PROXYHOSTNAME = 'proxyHostName';

    FilterSerializer.HOSTNAME = 'hostName';

    FilterSerializer.serialize = function(filters) {
      var down, filterCollection, hostFilter, isEnabledFilter, pa, poolsFilter, proxyFilter, serialized, stepLimitFilter, up;
      filterCollection = new Array();
      if (filters['search'] != null) {
        filterCollection.push(new EqualsFilter(this.QUICKSEARCH, filters['search']));
      }
      down = filters['status-down'];
      up = filters['status-up'];
      if (down && !up) {
        filterCollection.push(new EqualsFilter(this.RESOURCEAGENTSTATE, 'down'));
      }
      if (up && !down) {
        filterCollection.push(new EqualsFilter(this.RESOURCEAGENTSTATE, 'alive'));
      }
      if (filters['status'] === 'enabled') {
        isEnabledFilter = new EqualsFilter(this.RESOURCEDISABLED, filters['status']);
        filterCollection.push(isEnabledFilter);
      }
      if (filters['pools'] != null) {
        poolsFilter = new ContainsFilter(this.POOLS, filters['pools']);
        filterCollection.push(poolsFilter);
      }
      if (filters['hosts'] != null) {
        hostFilter = new EqualsFilter(this.HOSTNAME, filters['hosts']);
        filterCollection.push(hostFilter);
      }
      if (filters['step-limit'] != null) {
        stepLimitFilter = new GreaterThanFilter(this.STEPLIMIT, filters['step-limit']);
        filterCollection.push(stepLimitFilter);
      }
      pa = filters['proxy-agent'];
      if (pa !== 'no' && pa !== 0 && pa !== false) {
        if (pa === 'true' || pa === 'yes' || pa === 1) {
          proxyFilter = new NotEqualFilter(this.PROXYHOSTNAME, '');
        } else {
          proxyFilter = new EqualsFilter(this.PROXYHOSTNAME, '');
        }
        filterCollection.push(proxyFilter);
      }
      return serialized = FindObjectsFilterSerializer.serialize(filterCollection);
    };

    FilterSerializer.deserialize = function(serialized) {
      var d, decoded, deserialized, propertyName, sl, _i, _len;
      decoded = {
        'search': '',
        'status-down': false,
        'status-up': false,
        'status': '',
        'pools': '',
        'hosts': '',
        'step-limit': 0,
        'proxy-agent': 0
      };
      deserialized = new Array();
      FindObjectsFilterSerializer.deserialize(serialized, deserialized);
      for (_i = 0, _len = deserialized.length; _i < _len; _i++) {
        d = deserialized[_i];
        propertyName = d.getStringParameter('propertyName');
        switch (propertyName) {
          case this.QUICKSEARCH:
            decoded['search'] = d.getStringParameter('operand1');
            break;
          case this.RESOURCEAGENTSTATE:
            if ((d.getStringParameter('operand1')) === 'down') {
              decoded['status-down'] = true;
              decoded['status-up'] = false;
            } else if ((d.getStringParameter('operand1')) === 'alive') {
              decoded['status-down'] = false;
              decoded['status-up'] = true;
            }
            break;
          case this.RESOURCEDISABLED:
            decoded['status'] = d.getStringParameter('operand1');
            break;
          case this.POOLS:
            decoded['pools'] = d.getStringParameter('operand1');
            break;
          case this.STEPLIMIT:
            sl = d.getStringParameter('operand1');
            decoded['step-limit'] = parseInt(sl);
            break;
          case this.PROXYHOSTNAME:
            if ((d.getStringParameter('operator')) === 'notEqual') {
              decoded['proxy-agent'] = 1;
            }
            break;
          case this.HOSTNAME:
            decoded['hosts'] = d.getStringParameter('operand1');
            break;
        }
      }
      return decoded;
    };

    return FilterSerializer;

  })();
  return FilterSerializer;
});

/*
//@ sourceMappingURL=FilterSerializer.map
*/