export default function slider() {

    if (!document.querySelector('body').classList.contains('home')) return;

    const blockLeft = document.getElementById('block-left');
    const blockMain = document.getElementById('block-main');

    const blockRight = document.getElementById('block-right');
    const images = {
        0: 'blobid0.png', 1: 'blobid1.png', 2: 'blobid2.png', 3: 'blobid3.png', 4: 'blobid4.png'
    }

    const count = Object.keys(images).length;
    let currentImageIndex = 1;

    Element.prototype.changeBackground = function (imageIndex) {
        this.style.backgroundImage = `url(${images[imageIndex]})`;
    }

    blockLeft.changeBackground(0);
    blockMain.changeBackground(1);
    blockRight.changeBackground(2);

    blockLeft.onclick = () => changeImageWithAnimation(currentImageIndex - 1);
    blockRight.onclick = () => changeImageWithAnimation(currentImageIndex + 1);

    let timeout = undefined;

    function changeImageWithAnimation(expectedIndex) {
        clearTimeout(timeout);

        currentImageIndex = mod(expectedIndex, count);

        blockLeft.changeBackground(mod(currentImageIndex - 1, count));
        blockMain.changeBackground(currentImageIndex);
        blockRight.changeBackground(mod(currentImageIndex + 1, count));

        blockMain.classList.remove("fade-in");
        timeout = setTimeout(() => {
            blockMain.classList.add("fade-in");
            timeout = setTimeout(() => blockMain.classList.remove("fade-in"), 1000);
        }, 12)
    }

    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    /*
        Favourites block
     */
    let counter = 0;
}
