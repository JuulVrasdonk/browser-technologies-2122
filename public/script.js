if(Object.keys(window).indexOf('onload') !== -1) {
    window.onload = function(){
        const transitionElement = document.querySelector('.transition');
        const anchors = document.querySelectorAll('a');
        if(transitionElement && anchors) {
            setTimeout(function() {
                transitionElement.classList.remove('is-active');
            }, 500);
            for (let i = 0; i < anchors.length; i++) {
                const anchor = anchors[i];
        
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    // console.log(anchor.href);
                    let target = anchor.href;
                    transitionElement.classList.add('is-active');
        
                    setTimeout(function() {
                        window.location.href = target; 
                    }, 700)
                });
            }
        }
    }
}
