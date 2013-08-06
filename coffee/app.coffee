define ['FilterSerializer'], (FilterSerializer) ->
  class App
    filters:
      'search': 'test search'
      'status-down': true
      'status-up': false
      'status': 'enabled'
      'pools': 'pools names'
      'hosts': 'hosts names'
      'step-limit': 10
      'proxy-agent': 'no'

    start: ->

      serialized = FilterSerializer.serialize @filters
      console.log serialized
      decoded = FilterSerializer.deserialize serialized
      console.log decoded