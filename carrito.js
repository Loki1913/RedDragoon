// Función para cambiar la paleta de colores
function cambiarPaleta() {
    const body = document.body;
    const isDarkMode = body.dataset.theme === 'dark';
    body.dataset.theme = isDarkMode ? '' : 'dark';
}

// Asignar el evento al botón de cambiar paleta
document.addEventListener('DOMContentLoaded', () => {
    const botonCambiarPaleta = document.getElementById('cambiarPaleta');
    botonCambiarPaleta.addEventListener('click', cambiarPaleta);
});
