  let styles = {
    nav_bar_style: {
        "backgroundColor":"#00b0c7", 
        "height": "50px"
    },
    nav_item_style: {
        "height": "50px",
        "display": "inline",
        "marginLeft": "5%",
        "lineHeight": "50px"
    },
    link_style: {
        "color": "#fff", 
        "textDecoration": "none"
    },
    alert_style: {
        "display": "block",
        "animation": "fadeinSnackbar 0.5s, fadeoutSnackbar 0.5s 2.5s",
        "bottom": "40px"    
    },
    alert_style_small: {
        "display": "block",
        "animation": "fadeinSnackbar 0.5s, fadeoutSnackbar 0.5s 2.5s",
        "bottom": "0px"    
    },
    alert_hide: {
        "display": "none",
    }, 
    formStyle: {
        "textAlign": "center",
        "margin": "0 auto",
        "width": "85%",
        "height": "350px", 
        "border": "2px solid grey", 
        "paddingLeft": "50px", 
        "paddingRight": "50px", 
        "borderRadius": "6px"
    },
    text_input_style: {
        "borderRadius": "6px", 
        "border": "1px solid grey", 
        "width": "100%", 
        "marginTop": "5px", 
        "textAlign": "center", 
        "height": "14%", 
        "fontSize": "12pt"
    },
    login_button_style: {
        "marginTop": "5px", 
        "height": "20%", 
        "backgroundColor": "white", 
        "color": "black"
    },
    login_button_style_hover: {
        "marginTop": "5px", 
        "height": "20%", 
        "backgroundColor": "green", 
        "color": "white"
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
    },
    footer: {
        "width": "100%", 
        "backgroundColor": "#00b0c7", 
        "textAlign": "center", 
        "height": "50px", 
        "position": "fixed", 
        "bottom": "0px", 
        "lineHeight": "50px", 
        "color": "white"
    }, header: {
        "height": "20%"
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