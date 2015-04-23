app.events = {
    last_event_id: -1,
    templates: undefined,
    init:function() {
        var events = cobalt.storage.getItem("events", "json");
        if (Object.prototype.toString.call(events) === '[object Array]') {
            var eventsLength = events.length;
            for (var i = 0; i < eventsLength; i++) {
                if (Object.prototype.toString.call(events[i]) === '[object Object]'
                    && events[i].id > app.events.last_event_id) {
                    app.events.last_event_id = events[i].id;
                }
            }
        }
        else {
            cobalt.storage.setItem("events",
                [
                    {
                        id: 0,
                        title: "Sebastien F. birthday",
                        date: new Date(1972, 11, 26),
                        place: "Alsace",
                        notes: undefined
                    },
                   {
                        id: 1,
                        title: "Guillaume birthday",
                        date: new Date(1983, 4, 20),
                        place: "Alsace",
                        notes: undefined
                    },
                    {
                        id: 2,
                        title: "Sebastien V. birthday",
                        date: new Date(1987, 12, 22),
                        place: "Le Mans",
                        notes: undefined
                    },
                    {
                        id: 3,
                        title: "Kristal birthday",
                        date: new Date(2015, 2, 11),
                        place: "Lannion",
                        notes: undefined
                    },
                    {
                        id: 4,
                        title: "Cobalt workshop",
                        date: new Date(2015, 4, 23),
                        place: "Le Mans",
                        notes: undefined
                    },
                    {
                        id: 5,
                        title: "Hackathon",
                        date: new Date(2015, 5, 8),
                        place: "Lannion",
                        notes: undefined
                    }
                ],
                "json");
            app.events.last_event_id = 5;
        }
        app.events.initTemplates();
        app.events.reset();
        app.events.refresh();
    },
    getEvent:function(id) {
        if (typeof id !== 'number' || id % 1 !== 0) return undefined;

        var events = cobalt.storage.getItem("events", "json");
        if (Object.prototype.toString.call(events) !== '[object Array]') return [];

        var eventsLength = events.length;
        for (var i = 0; i < eventsLength; i++) {
            if (Object.prototype.toString.call(events[i]) === '[object Object]'
                && events[i].id == id) {
                return events[i];
            }
        }

        return undefined;
    },
    getEvents:function(id, count){
        if (typeof id !== 'number' || id % 1 !== 0) id = -1;
        if (typeof count !== 'number' || count % 1 !== 0) count = 6;

        var events = cobalt.storage.getItem("events", "json");
        if (Object.prototype.toString.call(events) !== '[object Array]') return [];

        var eventsLength = events.length;
        var startEvent = false;
        var result = [];
        for (var i = 0; i < eventsLength; i++) {
            if (Object.prototype.toString.call(events[i]) === '[object Object]') {
                if (id == -1) {
                    startEvent = true;
                }
                if (startEvent) {
                    if (count-- <= 0) {
                        break;
                    }
                    result.push(events[i]);
                }
                else if (events[i].id == id) {
                    startEvent = true;
                }
            }
        }
        return result;
    },
    addEvent:function(event){
        if (Object.prototype.toString.call(event) !== '[object Object]') return;

        var events = cobalt.storage.getItem("events", "json");
        if (Object.prototype.toString.call(events) !== '[object Array]') return;

        event.id = ++app.events.last_event_id;
        events.unshift(event);
        cobalt.storage.setItem("events", events, "json");
    },

    initTemplates:function(){
      var eventItemsource = $("#tpl_event_item").html();
      Handlebars.registerPartial('tpl_event_item', eventItemsource);

      var eventsHoldersource = $("#tpl_events_holder").html();
      var eventsHoldertemplate = Handlebars.compile(eventsHoldersource);

      var eventsPagesource = $("#tpl_events_page").html();
      var eventsPagetemplate = Handlebars.compile(eventsPagesource);

      app.events.templates = {
       'tpl_events_holder': eventsHoldertemplate,
       'tpl_events_page': eventsPagetemplate
      };
    },

    reset:function() {
      app.events.last_event_id = undefined;
      $('body').html(app.events.templates['tpl_events_holder']());
    },

    refresh:function(PTR_callback){
      var events = app.events.getEvents(app.events.last_event_id);
      app.events.last_event_id = events[events.length - 1].id;

      var page = $('<ul class="events-page"></ul>');
      page.html(app.events.templates['tpl_events_page'](events));
      page.attr('id', 'event-page_' + app.events.last_event_id);
      $('#events-list').append(page);
    },
};
