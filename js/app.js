// Generated by CoffeeScript 1.6.3
define(['FilterSerializer'], function(FilterSerializer) {
  var App;
  return App = (function() {
    function App() {}

    App.prototype.filters = {
      'search': 'test search',
      'status-down': true,
      'status-up': false,
      'status': 'enabled',
      'pools': 'pools names',
      'hosts': 'hosts names',
      'step-limit': 10,
      'proxy-agent': ''
    };

    App.prototype.start = function() {
      var decoded, serialized;
      serialized = FilterSerializer.serialize(this.filters);
      console.log(serialized);
      decoded = FilterSerializer.deserialize(serialized);
      return console.log(decoded);
    };

    return App;

  })();
});

/*
//@ sourceMappingURL=app.map
*/
