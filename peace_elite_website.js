document.addEventListener("DOMContentLoaded", function() {
    // 导航菜单切换
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");

    navLinks.forEach(function(navLink) {
        navLink.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach(function(section) {
                section.style.display = "none";
            });

            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });

    // 轮播图
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 3000); // 切换时间间隔：3秒
    }

    if (slides.length > 0) {
        showSlides();
    }

    prevBtn.addEventListener("click", function() {
        slideIndex -= 2;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlides();
    });

    nextBtn.addEventListener("click", function() {
        if (slideIndex >= slides.length - 1) {
            slideIndex = -1;
        }
        showSlides();
    });

    // 表单验证
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        const nameInput = document.querySelector("#name");
        const emailInput = document.querySelector("#email");
        const messageInput = document.querySelector("#message");

        if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === "") {
            event.preventDefault();
            alert("请填写所有必填字段！");
        }
    });

    // 模态框
    const modalOpenBtn = document.querySelector(".modal-open");
    const modalCloseBtn = document.querySelector(".modal-close");
    const modal = document.querySelector(".modal");

    modalOpenBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    modalCloseBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // 返回顶部按钮
    const scrollToTopBtn = document.querySelector(".scroll-to-top");

    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 扩展的功能1：页面加载时显示动画
    const animatedElements = document.querySelectorAll('.animate');

    window.addEventListener('load', function() {
        animatedElements.forEach(function(element) {
            element.classList.add('animated');
        });
    });

    // 扩展的功能2：滚动到元素时触发动画
    window.addEventListener('scroll', function() {
        animatedElements.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    });

    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});

            // 扩展的功能4：滚动监听导航菜单高亮
            window.addEventListener('scroll', function() {
                const fromTop = window.scrollY;
                const navLinks = document.querySelectorAll('nav ul li a');

                navLinks.forEach(function(navLink) {
                    const section = document.querySelector(navLink.hash);

                    if (
                        section.offsetTop <= fromTop + 100 &&
                        section.offsetTop + section.offsetHeight > fromTop + 100
                    ) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                });
            });

            // 扩展的功能5：展示滚动进度条
            const progressBar = document.querySelector('.progress-bar');

            window.addEventListener('scroll', function() {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

                progressBar.style.width = scrollPercent + '%';
            });

            // 扩展的功能6：自动播放视频
            const videoPlayer = document.querySelector('.video-player');
            const playButton = document.querySelector('.play-button');

            playButton.addEventListener('click', function() {
                videoPlayer.play();
            });

            // 扩展的功能7：音频控制
            const audioPlayer = document.querySelector('.audio-player');
            const volumeRange = document.querySelector('.volume-range');
            const volumeIcon = document.querySelector('.volume-icon');

            volumeRange.addEventListener('input', function() {
                audioPlayer.volume = volumeRange.value;
                updateVolumeIcon();
            });

            function updateVolumeIcon() {
                if (audioPlayer.volume === 0) {
                    volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
                } else if (audioPlayer.volume < 0.5) {
                    volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
                } else {
                    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            }

            updateVolumeIcon();

            // 扩展的功能8：页面加载进度条
            const pageLoader = document.querySelector('.page-loader');

            window.addEventListener('load', function() {
                pageLoader.style.opacity = '0';
                setTimeout(function() {
                    pageLoader.style.display = 'none';
                }, 500);
            });
        });

            // 扩展的功能9：展示当前时间
            function updateTime() {
                const currentTime = new Date();
                const hours = currentTime.getHours();
                const minutes = currentTime.getMinutes();
                const seconds = currentTime.getSeconds();

                const timeString = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

                document.querySelector('.current-time').innerText = timeString;
            }

            setInterval(updateTime, 1000);

            // 扩展的功能10：实现页面加载时的动画效果
            const animatedElementsOnLoad = document.querySelectorAll('.animate-on-load');

            window.addEventListener('load', function() {
                animatedElementsOnLoad.forEach(function(element) {
                    element.classList.add('animated');
                });
            });

            // 扩展的功能11：响应式处理
            window.addEventListener('resize', function() {
                // 添加响应式处理代码
            });

            // 扩展的功能12：其他自定义功能
            // 在这里添加你自己的自定义功能代码
        });
