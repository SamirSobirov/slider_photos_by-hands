let currentIndex = 0;
let currentPlaying = null;

function scrollSlider(direction) {
    const slidesContainer = document.querySelector('.slides');
    const slides = slidesContainer.children;
    const slideCount = slides.length;
    const slideWidth = slides[0].getBoundingClientRect().width;

    currentIndex += direction;

    if (currentIndex < 0) {
        // Moving left from the first slide to the last slide
        currentIndex = slideCount - 1;
        const newSlide = slides[slideCount - 1].cloneNode(true);
        slidesContainer.insertBefore(newSlide, slides[0]);
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(${-slideWidth - 20}px)`;
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 0.3s ease';
            slidesContainer.style.transform = `translateX(${-slideWidth}px)`;
            currentIndex = slideCount - 1;
        }, 0);
    } else if (currentIndex >= slideCount) {
        // Moving right from the last slide to the first slide
        currentIndex = 0;
        const newSlide = slides[0].cloneNode(true);
        slidesContainer.appendChild(newSlide);
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(${-slideWidth}px)`;
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 0.3s ease';
            slidesContainer.style.transform = `translateX(${-slideWidth - 20}px)`;
            currentIndex = 0;
        }, 0);
    } else {
        slidesContainer.style.transform = `translateX(${-currentIndex * (slideWidth + 20)}px)`;
    }
}

function playVideo(button) {
    const slide = button.closest('.slide');
    const fullVideo = slide.querySelector('.video-full');
    const playButton = slide.querySelector('.play-button');

    if (currentPlaying && currentPlaying !== fullVideo) {
        currentPlaying.pause();
        currentPlaying.style.display = 'none';
        currentPlaying.closest('.slide').classList.remove('expanded');
    }
  // Добавляем обработчик клика на видео .video-full
        playButton.style.display = 'none';
    fullVideo.style.display = 'block';
    fullVideo.play();
    currentPlaying = fullVideo;
    slide.classList.add('expanded');

  
}


document.querySelectorAll('.slide').forEach(slide => {
    const previewVideo = slide.querySelector('.video-preview');

    slide.addEventListener('mouseover', () => {
        previewVideo.play();
    });

    slide.addEventListener('mouseout', () => {
        previewVideo.pause();
        previewVideo.currentTime = 0;
    });

    slide.addEventListener('click', (e) => {
        if (e.target.classList.contains('play-button')) return;
        const fullVideo = slide.querySelector('.video-full');
        if (currentPlaying && currentPlaying !== fullVideo) {
            currentPlaying.pause();
            currentPlaying.style.display = 'none';
            currentPlaying.closest('.slide').classList.remove('expanded');
        }
        const playButton = slide.querySelector('.play-button');
        playButton.style.display = 'none';


        fullVideo.style.display = 'block';
        fullVideo.play();
        currentPlaying = fullVideo;
        slide.classList.add('expanded');
    });
});
