(function(d){var a={},c={},b,e={init:function(){var h,g,f;b=tinyMCEPopup.editor;a.url=d("#url-field");a.title=d("#link-title-field");a.openInNewTab=d("#link-target-checkbox");a.search=d("#search-field");c.search=d("#search-results");c.recent=d("#most-recent-results");d("#wp-update").click(e.update);d("#wp-cancel").click(function(){tinyMCEPopup.close()});d(".query-results").delegate("li","click",e.selectInternalLink);d(".wp-results-pagelinks").delegate("a","click",e.selectPageLink);a.search.keyup(e.searchInternalLinks);if(h=b.dom.getParent(b.selection.getNode(),"A")){a.url.val(h.href);a.title.val(b.dom.getAttrib(h,"title"));if("_blank"==b.dom.getAttrib(h,"target")){a.openInNewTab.attr("checked","checked")}}},update:function(){var j,g=tinyMCEPopup.editor,h={href:a.url.val(),title:a.title.val(),target:a.openInNewTab.attr("checked")?"_blank":""},k,f,i=h.title?h.title:h.href;tinyMCEPopup.restoreSelection();k=g.dom.getParent(g.selection.getNode(),"A");if(!h.href){if(g.selection.isCollapsed()){tinyMCEPopup.close();return}else{if(k){tinyMCEPopup.execCommand("mceBeginUndoLevel");f=g.selection.getBookmark();g.dom.remove(k,1);g.selection.moveToBookmark(f);tinyMCEPopup.execCommand("mceEndUndoLevel");tinyMCEPopup.close();return}}}tinyMCEPopup.execCommand("mceBeginUndoLevel");if(k==null){g.getDoc().execCommand("unlink",false,null);if(g.selection.isCollapsed()){var j=g.dom.create("a",{href:"#mce_temp_url#"},i);g.selection.setNode(j)}else{tinyMCEPopup.execCommand("CreateLink",false,"#mce_temp_url#",{skip_undo:1})}tinymce.each(g.dom.select("a"),function(l){if(g.dom.getAttrib(l,"href")=="#mce_temp_url#"){k=l;g.dom.setAttribs(k,h)}})}else{g.dom.setAttribs(k,h)}if(k.childNodes.length!=1||k.firstChild.nodeName!="IMG"){g.focus();g.selection.select(k);g.selection.collapse(0);tinyMCEPopup.storeSelection()}tinyMCEPopup.execCommand("mceEndUndoLevel");tinyMCEPopup.close()},selectInternalLink:function(){var f=d(this);if(f.hasClass("unselectable")){return}f.siblings(".selected").removeClass("selected");f.addClass("selected");a.url.val(f.children(".item-permalink").val());a.title.val(f.children(".item-title").text())},selectPageLink:function(g){var f=g.target.href.match(/page=(\d+)/);f=f?f[1]:1;g.preventDefault();e.linkAJAX(d(this),{page:f})},searchInternalLinks:function(){var f=d(this),h,g=f.val();if(g){c.recent.hide();c.search.show();h=f.siblings("img.waiting").show();e.linkAJAX(c.search,{title:g},function(){h.hide()})}else{c.search.hide();c.recent.show()}},linkAJAX:function(g,f,h){if(!g.hasClass("query-results")){g=g.parents(".query-results")}if(!g.length){return}d.post(ajaxurl,d.extend({action:"wp-link-ajax"},f),function(j){var i=g.children(".wp-results-pagelinks");g.children("ul").html(e.generateListMarkup(j.results));if(j.page_links){i.html(j.page_links).show()}else{i.hide()}if(h){h(j.results)}},"json")},generateListMarkup:function(f){var g="";if(!f){return'<li class="no-matches-found unselectable"><span class="item-title"><em>'+wpLinkL10n.noMatchesFound+"</em></span></li>"}d.each(f,function(){g+='<li><input type="hidden" class="item-permalink" value="'+this["permalink"]+'" />';g+='<span class="item-title">';g+=this["title"]?this["title"]:"<em>"+wpLinkL10n.untitled+"</em>";g+='</span><span class="item-info">'+this["info"]+"</span>";g+="</li>"});return g}};d(document).ready(e.init)})(jQuery);