// Custom cursor with smooth follow effect

class CustomCursor {
    constructor() {
        this.outer = document.getElementById('cursor-outer');
        this.inner = document.getElementById('cursor-inner');
        this.mouseX = 0;
        this.mouseY = 0;
        this.outerX = 0;
        this.outerY = 0;
        this.innerX = 0;
        this.innerY = 0;
        this.isHovering = false;
        this.isClicking = false;
        this.init();
    }

    init() {
        if (window.matchMedia('(pointer: fine)').matches) {
            document.body.style.cursor = 'none';
            this.bindEvents();
            this.animate();
        } else {
            if (this.outer) this.outer.style.display = 'none';
            if (this.inner) this.inner.style.display = 'none';
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        document.addEventListener('mouseenter', () => {
            if (this.outer) this.outer.style.opacity = '1';
            if (this.inner) this.inner.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            if (this.outer) this.outer.style.opacity = '0';
            if (this.inner) this.inner.style.opacity = '0';
        });

        document.addEventListener('mousedown', () => {
            this.isClicking = true;
            if (this.outer) this.outer.classList.add('clicking');
            if (this.inner) this.inner.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            this.isClicking = false;
            if (this.outer) this.outer.classList.remove('clicking');
            if (this.inner) this.inner.classList.remove('clicking');
        });

        const interactiveElements = document.querySelectorAll('a, button, .tech-card, .project-card, .skill-card, .contact-link, .skill-item, input, textarea');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.isHovering = true;
                if (this.outer) this.outer.classList.add('hovering');
                if (this.inner) this.inner.classList.add('hovering');
            });

            el.addEventListener('mouseleave', () => {
                this.isHovering = false;
                if (this.outer) this.outer.classList.remove('hovering');
                if (this.inner) this.inner.classList.remove('hovering');
            });
        });
    }

    animate() {
        this.outerX += (this.mouseX - this.outerX) * 0.1;
        this.outerY += (this.mouseY - this.outerY) * 0.1;
        this.innerX += (this.mouseX - this.innerX) * 0.25;
        this.innerY += (this.mouseY - this.innerY) * 0.25;

        if (this.outer) {
            this.outer.style.transform = `translate(${this.outerX}px, ${this.outerY}px) translate(-50%, -50%)`;
        }

        if (this.inner) {
            this.inner.style.transform = `translate(${this.innerX}px, ${this.innerY}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
});
