function animateFirstBlock () {
    const part = document.getElementById('block-1__text__part')
    const mainPlace = document.getElementById('block-1__text')
    const altPlace = document.getElementById('block-1__alt')

    window.addEventListener('resize', event => {
        let place = window.matchMedia("(max-width: 1030px)").matches ? altPlace : mainPlace
        if (part.parentElement !== place) {
            place.appendChild(part)
        }
    })
}


function animateImages () {
    let img2 = document.getElementById('block-2__img')
    let img3 = document.getElementById('block-3__img')

    let img2Observed = img2.parentElement
    let img3Observed = document.getElementById('block-3__list')

    let observer = new IntersectionObserver((entries) => {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                if (entries[i].target === img2Observed) {
                    img2.querySelector('#block-2__img__palm').style.animationName = 'palm-hitting'
                    img2.querySelector('#block-2__img__hit').style.animationName = 'figure-hit-effect'
                    img2.querySelector('#block-2__img__figure').style.animationName = 'figure-harmed'
                }

                if (entries[i].target === img3Observed) {
                    img3.style.animationName = 'plane'
                }
            }
        }
    })

    observer.observe(img2Observed)
    observer.observe(img3Observed)
}


function animateSteps () {
    let b4 = document.getElementById('block-3__controls')

    let b4Back = b4.querySelector('.arrow-button--left')
    let b4Out = b4.querySelector('.block__controls__output')
    let b4Next = b4.querySelector('.arrow-button--right')
    let b4Container = b4Back.ariaControlsElements[0]
    let elWidth = b4Container.children[0].offsetWidth

    for (let i = 0; i < b4Out.children.length; ++ i) {
        b4Out.children[i].addEventListener('click', event => {
            b4Container.scrollTo({ left: elWidth * i, behavior: 'smooth' })
        })
    }

    function reviewButtons (left = 0) {
        let current = Math.round(left / elWidth)
        let length = Math.round((b4Container.scrollWidth - b4.offsetWidth) / elWidth)

        b4Back.disabled = current <= 0
        b4Next.disabled = current >= length

        for (let child of b4Out.children) {
            child.removeAttribute('aria-current')
        }
        b4Out.children[current].ariaCurrent = 'step'
    }

    b4Back.addEventListener('click', event => {
        b4Container.scrollTo({ left: b4Container.scrollLeft - elWidth, behavior: 'smooth' })
        reviewButtons(b4Container.scrollLeft - elWidth)
    })

    b4Next.addEventListener('click', event => {
        b4Container.scrollTo({ left: b4Container.scrollLeft + elWidth, behavior: 'smooth' })
        reviewButtons(b4Container.scrollLeft + elWidth)
    })

    b4Container.addEventListener('scroll', event => {
        reviewButtons(b4Container.scrollLeft)
    })

    reviewButtons()

    window.addEventListener('resize', event => {
        b4Container.scrollTo({ left: 0, behavior: 'smooth' })
        elWidth = b4Container.children[0].offsetWidth
    })
}


function animatePersons () {

    let b4 = document.getElementById('block-4__controls')

    let b4Back = b4.querySelector('.arrow-button--left')
    let b4Out = b4.querySelector('.block__controls__output__current')
    let b4Max = b4.querySelector('.block__controls__output__max')
    let b4Next = b4.querySelector('.arrow-button--right')
    let b4Container = b4Back.ariaControlsElements[0]
    let elWidth = b4Container.children[0].offsetWidth

    b4Max.textContent = '/ ' + b4Container.children.length
    b4Container.style.height = b4Container.children[0].offsetHeight + 'px'

    const gap = 20

    let page = 0
    let length = b4Container.children.length
    let window_ = Math.ceil(b4.parentElement.offsetWidth / elWidth)

    let width = (elWidth + gap) * length

    function render () {
        b4Container.style.transform = 'translateX(' + -(elWidth + gap) * page + 'px)'
        for (let i = 0; i < length; ++ i) {
            if (i < page - 1) {
                b4Container.children[i].style.transform = 'translateX(' + +width + 'px)'
            }
            else if (i > page + window_) {
                b4Container.children[i].style.transform = 'translateX(' + -width + 'px)'
            }
            else {
                b4Container.children[i].style.transform = 'translateX(' + 0 + 'px)'
            }
        }
        b4Out.textContent = (page + 1).toString()
    }

    function prev () {
        page --
        if (page < 0) {
            page = length - 1
            b4Container.style.transition = 'none'
            page ++
            setTimeout(() => { b4Container.style.removeProperty('transition') }, 0)
            setTimeout(prev, 0)
        }
        render()
    }
    function next () {
        page ++
        if (page > length - 1) {
            page = 0
            b4Container.style.transition = 'none'
            page --
            setTimeout(() => { b4Container.style.removeProperty('transition') }, 0)
            setTimeout(next, 0)
        }
        render()
    }

    b4Back.addEventListener('click', prev)
    b4Next.addEventListener('click', next)

    render()

    setInterval(() => {
        if (!b4Container.parentElement.parentElement.matches(':hover')) next()
    }, 4000)

    window.addEventListener('resize', event => {
        elWidth = b4Container.children[0].offsetWidth
        window_ = Math.ceil(b4.parentElement.offsetWidth / elWidth)
        width = (elWidth + gap) * length
        render()
    })
}


window.onload = function () {
    animateFirstBlock()
    animateImages()
    animateSteps()
    animatePersons()
}