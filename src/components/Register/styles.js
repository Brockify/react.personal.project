let styles = {
    alert_style: {
        "display": "block",
        "animation": "fadeinSnackbar 0.5s, fadeoutSnackbar 0.5s 2.5s",
        "backgroundColor": "#00b8e6",
        "color": "white",    
        "width": "50%",
        "margin": "0 auto",
        "marginBottom": "20px",        
    },
    alert_style_small: {
        "display": "block",
        "animation": "fadeinSnackbar 0.5s, fadeoutSnackbar 0.5s 2.5s",
        "bottom": "0px" ,
        "width": "50%",
        "color": "white",
        "backgroundColor": "#00b8e6",
        "margin": "0 auto",
        "marginBottom": "20px", 
    },
    alert_hide: {
        "display": "none",
    },
    alert_div: {
        "textAlign": "center", 
        "bottom": "40px",
        "position": "fixed",
        "width": "100%",
        "zIndex": "999",
    },
    alert_div_small: {
        "textAlign": "center", 
        "bottom": "0px",
        "position": "fixed",
        "width": "100%",
        "zIndex": "999",  
    }, "@media screen and (min-height: 400px)": {
        alert_div: {
            "textAlign": "center", 
            "bottom": "0px",
            "position": "fixed",
            "width": "100%",
            "zIndex": "999",  
        }
    }
}
export default styles;