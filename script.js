/*
	To add cover images:
	- Place image files in the `images/` folder.
	- Set the `cover` property below to the relative path (e.g. "images/hearthside.jpg").
	- If no `cover` is provided, a gradient is used based on `tone`.
*/
const books = [
	{id:1,title:"The X Over",author:"Natasha Garry",desc:"Two women with different backgrounds cross paths, as they attempt to maintain their co-existence in one person's life. A raving novel that will keep you on the edge of your seat.",tone:"earth",cover:"https://m.media-amazon.com/images/I/81-y0xDViuL._SY342_.jpg",amazonUrl:"https://www.amazon.com/dp/B08S3FRG2R?ref=cm_sw_r_ffobk_cso_em_apan_dp_4T76G2M68281WNEW0P8F"},
	{id:2,title:"O.L.I.L.: Finding Myself",author:"Natasha Garry",desc:"A woman's journey to giving up on loving others who didn't love her back and learning to love herself. Overcoming heartache, pain, and obstacles while growing closer to God.",tone:"tan",cover:"https://m.media-amazon.com/images/I/61-ZDmH+GYL._SY342_.jpg",amazonUrl:"https://www.amazon.com/dp/B0C1JD76PK?ref=cm_sw_r_ffobk_cso_em_apan_dp_Z4FJZ23BYDC6ZBD7WC78"},
	{id:3,title:"Once Loved Innocence Lost: Help Me Lord Part 2",author:"Natasha Garry",desc:"A single mother struggling with work, finances, and love tries to be better for her five children. Learning to love herself and trust in God while seeking a better life.",tone:"dark",cover:"https://m.media-amazon.com/images/I/814-m1u6KnL._SY342_.jpg",amazonUrl:"https://www.amazon.com/dp/B089T88MS7?ref=cm_sw_r_ffobk_cso_em_apan_dp_9XBEJXMAQ915ZK8VK0T5"},
	{id:4,title:"Once Loved Innocence Lost",author:"Natasha Garry",desc:"A little girl growing up in the projects learns to be a better parent than what she was taught. Despite obstacles, she moves to a better place for her family with God's help.",tone:"amber",cover:"https://m.media-amazon.com/images/I/91KouWLGSJL._SY342_.jpg",amazonUrl:"https://www.amazon.com/dp/B07LDWF4GP?ref=cm_sw_r_ffobk_cso_em_apan_dp_9Q8TFXX0D3TR4DSGSK8H"},
	{id:5,title:"Under the Oak",author:"S. Patel",desc:"Poems about seasons, kitchens, and family recipes.",tone:"sepia",cover:"images/under_oak.jpg"},
	{id:6,title:"Woodbound",author:"J. Greene",desc:"A gentle mystery that favors mood over plot.",tone:"chestnut",cover:"images/woodbound.jpg"}
];

const coverColors = {
	earth:['#6b4226','#a16d4a'],
	tan:['#8b5e34','#d6b08a'],
	dark:['#2b1f17','#6d4a3b'],
	amber:['#9b5f2a','#e0b07a'],
	sepia:['#7b4c2f','#c9a57f'],
	chestnut:['#5a351f','#b57a57']
};

const booksEl = document.getElementById('books');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = document.getElementById('modal-author');
const modalDesc = document.getElementById('modal-desc');
const modalCover = document.getElementById('modal-cover');

function renderGrid(list){
	booksEl.innerHTML = '';
	list.forEach(b=>{
		const card = document.createElement('article');
		card.className = 'book-card';
		card.tabIndex = 0;

		const cover = document.createElement('div');
		cover.className = 'cover';
		const colors = coverColors[b.tone] || ['#7a4b2a','#caa585'];
		// use gradient base and optionally a cover image on top
		let bg = `linear-gradient(180deg, ${colors[0]}, ${colors[1]})`;
		if(b.cover){
			cover.style.backgroundImage = `${bg}, url("${b.cover}")`;
			cover.style.backgroundSize = 'cover';
			cover.style.backgroundPosition = 'center';
		} else {
			cover.style.background = bg;
		}
		cover.innerHTML = `<span class="cover-title">${b.title.split(' ').slice(0,2).join(' ')}</span>`;

		const info = document.createElement('div');
		info.className = 'book-info';
		info.innerHTML = `<h3 class="title">${b.title}</h3><p class="author">${b.author}</p><p class="excerpt">${b.desc}</p>`;

		card.appendChild(cover);
		card.appendChild(info);
		card.addEventListener('click',()=>openModal(b));
		card.addEventListener('keydown',e=>{if(e.key === 'Enter') openModal(b)});
		booksEl.appendChild(card);
	});
}

function openModal(book){
	modal.setAttribute('aria-hidden','false');
	modalTitle.textContent = book.title;
	modalAuthor.textContent = book.author;
	modalDesc.textContent = book.desc;
	const colors = coverColors[book.tone] || ['#7a4b2a','#caa585'];
	let bg = `linear-gradient(180deg, ${colors[0]}, ${colors[1]})`;
	if(book.cover){
		modalCover.style.backgroundImage = `${bg}, url("${book.cover}")`;
		modalCover.style.backgroundSize = 'cover';
		modalCover.style.backgroundPosition = 'center';
	} else {
		modalCover.style.background = bg;
	}
	
	// Add or remove Amazon button
	let amazonBtn = document.getElementById('amazon-button');
	if(book.amazonUrl){
		if(!amazonBtn){
			amazonBtn = document.createElement('a');
			amazonBtn.id = 'amazon-button';
			amazonBtn.className = 'amazon-btn';
			amazonBtn.target = '_blank';
			amazonBtn.rel = 'noopener noreferrer';
			document.querySelector('.modal-body').appendChild(amazonBtn);
		}
		amazonBtn.href = book.amazonUrl;
		amazonBtn.innerHTML = '📚 View on Amazon';
		amazonBtn.style.display = 'inline-block';
	} else if(amazonBtn){
		amazonBtn.style.display = 'none';
	}
}

function closeModal(){
	modal.setAttribute('aria-hidden','true');
}

modalBackdrop.addEventListener('click',closeModal);
modalClose.addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});

searchEl.addEventListener('input', ()=>{
	const q = searchEl.value.trim().toLowerCase();
	if(!q) return renderGrid(books);
	const filtered = books.filter(b=> (b.title + ' ' + b.author).toLowerCase().includes(q));
	renderGrid(filtered);
});

document.getElementById('year').textContent = new Date().getFullYear();
renderGrid(books);
