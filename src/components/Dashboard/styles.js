let styles = { 
    modal: {
        "height": "100%",
        "position": "fixed",
        "backgroundColor": "black",
        "width": "100%",
        "display": "none",
    },
    modal_open: {
        "height": "100%",
        "position": "fixed",
        "backgroundColor": "black",
        "width": "100%",
        "display": "block",
        "animation": "modalEnter .7s",
    },    
     modal_close: {
        "height": "100%",
        "position": "fixed",
        "backgroundColor": "black",
        "width": "100%",
        "animation": "modalExit .7s",
        "animation-fill-mode": "forwards"
        
    }
  }
export default styles;