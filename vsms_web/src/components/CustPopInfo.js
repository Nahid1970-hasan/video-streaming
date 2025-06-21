class CustPopInfo extends window.google.maps.OverlayView {
    constructor(props) {
       super(props);
       this.position = props.position; // lat, lng position provided by map. This is where the popup is supposed to be rendered
       this.content = props.content; // The HTML element to be rendered in the popup.
 
       // Create and style the popup markup.
       this.containerDiv = document.createElement("div");
       this.containerDiv.appendChild(content);
    }
 
    /** Called when the popup is added to the map. */
    onAdd = () => {
       this.getPanes().floatPane.appendChild(this.containerDiv);
    };
 
    /** Called when the popup is removed from the map. */
    onRemove = () => {
       this.content.parentElement.removeChild(this.content);
    };
 
    /** Called each frame when the popup needs to draw itself. */
    draw = () => {
       const divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position
       );
       this.content.style.left = divPosition.x + "px";
       this.content.style.top = divPosition.y + "px";
    };
 }