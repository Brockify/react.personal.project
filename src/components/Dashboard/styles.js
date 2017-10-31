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
        "zIndex": "999"
    },    
     modal_close: {
        "height": "100%",
        "position": "fixed",
        "backgroundColor": "black",
        "width": "100%",
        "animation": "modalExit .7s",
        "animationFillMode": "forwards",
        "display": "none"
        
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
    },
    read_div_more: {
        "height": "600px", 
        "backgroundColor": "white", 
        "textAlign": "center", 
        "width": "100%", 
        "overflow": "hidden",
        "animation": "show_more 1s"
    },
    read_div_less: {
        "height": "300px", 
        "backgroundColor": "white", 
        "textAlign": "center", 
        "width": "100%", 
        "overflow": "hidden",
        "animation": "show_less 1s"
    },
    library_div: {
        "height": "300px", 
        "backgroundColor": "white", 
        "textAlign": "center", 
        "width": "100%", 
        "overflow": "hidden",
    },
    comic_modal_open: {
        "position": "absolute",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "z-index": "10",
        "overflow": "auto", 
        "backgroundColor": "rgba(169,169,169,.6)", 
        "animation": "fadeInModal 1s",
        "display": "block",
        "position": "fixed",
    },    
    comic_modal_close: {
        "position": "absolute",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "z-index": "0",
        "overflow": "auto", 
        "backgroundColor": "rgba(169,169,169,.6)", 
        "animation": "fadeOutModal 1s",
        "transition":" opacity 0",
        "position": "fixed",
        "opacity": "0",
        "pointer-events": "none"
        
    }, comic_modal: {
        "position": "absolute",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "z-index": "10",
        "overflow": "auto", 
        "backgroundColor": "rgba(169,169,169,.6)", 
        "display" : "none"
    }, 
    comic_buttons: {
        "width": "100%",
        "height": "40px", 
        "margin": "0 auto", 
        "position": "absolute", 
        "bottom": "0", 
        "opacity": "0"
    }, 
    comic_buttons_hover: {
        "width": "100%",
        "height": "40px", 
        "margin": "0 auto", 
        "position": "absolute", 
        "bottom": "0", 
        "opacity": "1",
        "animation": "fadeInComicButtons 1s"
    }, 
    comic_buttons_hover_out: {
        "width": "100%",
        "height": "40px", 
        "margin": "0 auto", 
        "position": "absolute", 
        "bottom": "0", 
        "opacity": "0",
        "animation": "fadeOutComicButtons 1s"
    }, comic_middle : {
        "transition": "1s ease",
        "position": "absolute",
        "top": "0px",
        "width": "100%",
        "text-align": "center",
        "background": "linear-gradient(#ff6666, #00b8e6)",
        "height": "300px",
        "opacity": "0"
    }, comic_middle_hover : {
        "position": "absolute",
        "top": "0px",
        "width": "100%",
        "text-align": "center",
        "background": "linear-gradient(#ff6666, #00b8e6)",
        "height": "300px",
        "opacity": ".5",
        "animation": "fadeInComics .5s"
    }, comic_middle_hover_out : {
        "position": "absolute",
        "top": "0px",
        "width": "100%",
        "text-align": "center",
        "background": "linear-gradient(#ff6666, #00b8e6)",
        "height": "300px",
        "opacity": "0",
        "animation": "fadeOutComics .5s"        
    }
  }
export default styles;