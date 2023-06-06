const carousel = document.querySelector('.carousel')
const firstImg = carousel.querySelectorAll('img')[0]
const icons = document.querySelectorAll('i')

let isDragStart = false, isDragging = false, prevPageX, prevLeft, positionDiff

const IconsVisibility = () =>
{
    let draggableWidth = carousel.scrollWidth - carousel.clientWidth
    icons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
    icons[1].style.display = carousel.scrollLeft == draggableWidth ? 'none' : 'block'
}

icons.forEach(icon =>
    {
        icon.addEventListener('click', () =>
        {
        let firstWidth = +firstImg.clientWidth + 14
        carousel.scrollLeft += icon.id == 'left' ? -firstWidth : firstWidth
        setTimeout(() => {
            IconsVisibility()
        }, 60);
    })
})

const autoSliding = () =>
{
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return
    positionDiff = Math.abs(positionDiff)
    let firstWidth = firstImg.clientWidth + 14
    let valDiff = firstWidth - positionDiff

    if (carousel.scrollLeft > prevLeft)
    {
        return carousel.scrollLeft += positionDiff > firstWidth / 3 ? valDiff : -positionDiff
    }
        carousel.scrollLeft -= positionDiff > firstWidth / 3 ? valDiff : -positionDiff
}

const dragStart = (e) => 
{
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX
    prevLeft = carousel.scrollLeft
}

const dragging = (e) =>
{
    if(!isDragStart) return 
    e.preventDefault()
    isDragging = true
    carousel.classList.add('dragging')
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    carousel.scrollLeft = prevLeft - positionDiff
    IconsVisibility()
}

const dragStop = () =>
{
    isDragStart = false
    carousel.classList.remove('dragging')
    if (!isDragging) return
    isDragging = false
    autoSliding()
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('touchstart', dragStart)

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('touchmove', dragging)

carousel.addEventListener('mouseup', dragStop)

carousel.addEventListener('mouseleave', dragStop)
carousel.addEventListener('touchend', dragStop)