const images = [
  { src: "https://picsum.photos/600/400?random=1", title: "Mountain View", category: "nature" },
  { src: "https://picsum.photos/600/400?random=2", title: "City Lights", category: "city" },
  { src: "https://picsum.photos/600/400?random=3", title: "Laptop Setup", category: "tech" },
  { src: "https://picsum.photos/600/400?random=4", title: "Delicious Pizza", category: "food" },
  { src: "https://picsum.photos/600/400?random=5", title: "Forest Path", category: "nature" },
  { src: "https://picsum.photos/600/400?random=6", title: "New York Street", category: "city" },
  { src: "https://picsum.photos/600/400?random=7", title: "Code on Screen", category: "tech" },
  { src: "https://picsum.photos/600/400?random=8", title: "Burger Time", category: "food" },
  { src: "https://picsum.photos/600/400?random=9", title: "Ocean Sunset", category: "nature" },
  { src: "https://picsum.photos/600/400?random=10", title: "Tokyo Night", category: "city" },
  { src: "https://picsum.photos/600/400?random=11", title: "Smartphone", category: "tech" },
  { src: "https://picsum.photos/600/400?random=12", title: "Fresh Fruits", category: "food" },
];

let currentList = [...images];
let currentIndex = 0;
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function render(list){
  gallery.innerHTML = '';
  list.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${img.src}" alt="${img.title}"><div class="caption">${img.title}</div>`;
    div.onclick = () => openLightbox(index, list);
    gallery.appendChild(div);
  });
}

function openLightbox(index, list){
  currentList = list; currentIndex = index;
  lightboxImg.src = currentList[currentIndex].src;
  lightboxCaption.textContent = currentList[currentIndex].title;
  lightbox.classList.add('show');
}
function showNext(step){
  currentIndex = (currentIndex + step + currentList.length) % currentList.length;
  lightboxImg.src = currentList[currentIndex].src;
  lightboxCaption.textContent = currentList[currentIndex].title;
}

document.querySelector('.close').onclick = () => lightbox.classList.remove('show');
document.querySelector('.next').onclick = (e) => { e.stopPropagation(); showNext(1); };
document.querySelector('.prev').onclick = (e) => { e.stopPropagation(); showNext(-1); };
lightbox.onclick = (e) => { if(e.target === lightbox) lightbox.classList.remove('show'); };

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    const filtered = f === 'all' ? images : images.filter(i => i.category === f);
    render(filtered);
  };
});

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  render(images.filter(i => i.title.toLowerCase().includes(q)));
});

render(images);
