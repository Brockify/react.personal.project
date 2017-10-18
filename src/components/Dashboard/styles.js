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
        "animationFillMode": "forwards"
        
    },
     unread_div: {
        "height": "300px", 
        "backgroundColor": "white", 
        "textAlign": "center", 
        "width": "100%", 
        "overflow": "hidden",
    }, 
    unread_div_more: {
        "height": "600px", 
        "backgroundColor": "white", 
        "textAlign": "center", 
        "width": "100%", 
        "overflow": "hidden",
        "animation": "show_more 1s"
    },
    unread_div_less: {
        "height": "300px", 
        "backgroundColor": "white", 
        "textAlign": "center", 
        "width": "100%", 
        "overflow": "hidden",
        "animation": "show_less 1s"
    }, 
    read_div: {
        "height": "300px", 
        "backgroundColor": "white", 
        "textAlign": "center", 
        "width": "100%", 
        "overflow": "hidden",
    }
  }
export default styles;