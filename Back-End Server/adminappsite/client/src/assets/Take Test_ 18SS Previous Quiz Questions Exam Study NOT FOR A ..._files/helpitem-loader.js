eesy.define(['jquery-private', 'sessionInfo'], 
    function($, sessionInfo) {
  var helpitems = [];

  function getHelpitem(helpitmid) {
      for (var ihi = 0; ihi < helpitems.length; ihi++ ) {
          if (helpitems[ihi].id == helpitmid)
              return helpitems[ihi];
      }

      return null;
  }
  
  function parseVoting(json) {
    return {
      enabled: json.voting.enabled == "true",
      votedUp: json.voting.votedUp == "true",
      votedDown: json.voting.votedDown == "true"
    }
  }


  /*
   * Public functions
   */

  function loadHelpItem(hid, success) {
    var hi = getHelpitem(hid);

    if (hi != null) {
      success(hi);
    } else {
        loadurl = sessionInfo.dashboardUrl() + "/Scripts/HelpItemLoader.jsp?id=" + hid + "&key="
            + sessionInfo.sessionKey() + '&u=' + var_eesy_dbUpdateCount;

        $.ajax({
            type: 'GET',
            url: loadurl,
            async: true,
            //jsonpCallback: 'jsonHelpitemLoad_' + hid,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
//                helpitems[helpitems.length] = new HelpItem(hid, json.title, json.embed,
//                        json.itemtype, json.width, json.height, "true", parseVoting(json));
              helpitems[helpitems.length] = {
                  id: hid,
                  title: json.title,
                  embed: json.embed,
                  itemtype: json.itemtype,
                  width: json.width,
                  height: json.height,
                  visible: "true",
                  voting: parseVoting(json)
              }; 
              
              success(helpitems[helpitems.length -1]);
            }
        });
    }
  }
  
  return {
    loadHelpItem: loadHelpItem
  };
});