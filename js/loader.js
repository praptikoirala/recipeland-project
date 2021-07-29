const loader = document.querySelector('.loader-out');

export function showLoader () {
   loader.style.display = 'block';
}

export function hideLoader(){
   loader.style.display = 'none';
}