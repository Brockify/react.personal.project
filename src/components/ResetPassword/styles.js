let styles = { 
    formStyle: {
        "textAlign": "center",
        "margin": "0 auto",
        "padding": "0px",
        "height": "230px",
        "paddingLeft": "6%",
        "paddingRight": "6%",
        "marginTop": "30px"
    },
    text_input_style: {
        "borderRadius": "6px", 
        "border": "1px solid grey", 
        "width": "100%", 
        "marginTop": "5px", 
        "textAlign": "center", 
        "height": "60px", 
        "fontSize": "12pt"
    },
    reset_button_style: {
        "marginTop": "5px", 
        "height": "60px",
        "backgroundColor": "#00b8e6", 
        "color": "#f2f2f2",
    }, reset_button_style_hover: {
        "marginTop": "5px", 
        "height": "60px", 
        "backgroundColor": "rgba(0, 184, 230, 0.8)", 
        "color": "rgba(242, 242, 242, 0.93)"
    },
    alert_div: {
        "textAlign": "center", 
        "marginTop": "5px", 
        "paddingBottom": "60px",
        "width": "100%"
    },
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