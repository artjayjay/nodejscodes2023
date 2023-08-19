/////////////////////// include html //////////////////////
async function includehtml(includeId, contentid) {
  try {
    var html = document.querySelector(`[HTMLINCLUDE="${includeId}"]`);
    let data = document.querySelector(`[HTMLINCLUDE="${contentid}"]`).innerHTML;
    html.innerHTML = data;
  } catch (error) {}
}
///////////////////////////////////////////////////////////
///////////////////////// for opening modals /////////////////////
function openmodal(includeId, content) {
  document.querySelector(`[HTMLINCLUDE="${includeId}"]`).style.display =
    "block";
  includehtml(includeId, content);
}
//////////////////////////////////////////////////////////////////

///////////////////////// for closing modals /////////////////////
function closemodal(includeId) {
  document.querySelector(`[HTMLINCLUDE="${includeId}"]`).innerHTML = "";
  document.querySelector(`[HTMLINCLUDE="${includeId}"]`).style.display = "none";
}
//////////////////////////////////////////////////////////////////
