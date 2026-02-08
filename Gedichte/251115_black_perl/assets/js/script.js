function getSafePosition(popupWidth, popupHeight, minDistance = 150) {
    let x, y, distance;

    do {
        x = Math.random() * (window.innerWidth - popupWidth);
        y = Math.random() * (window.innerHeight - popupHeight);

        const dx = x - mouseX;
        const dy = y - mouseY;

        distance = Math.sqrt(dx * dx + dy * dy);

    } while (distance < minDistance);

    return { x, y };
}
