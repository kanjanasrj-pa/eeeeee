const seedProducts=[
{id:1,name:'เมล็ดพันธุ์มะเขือเทศ',category:'ผักสวนครัว',price:45,rating:4.8,reviews:120,stock:50,image:'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85',desc:'เมล็ดพันธุ์มะเขือเทศคุณภาพ เหมาะสำหรับปลูกในประเทศไทย ให้ผลผลิตดี รสชาติหวานอมเปรี้ยว เก็บเกี่ยวได้ประมาณ 70–90 วัน'},
{id:2,name:'เมล็ดพันธุ์ข้าวหอมมะลิ',category:'พืชไร่',price:120,rating:4.7,reviews:98,stock:100,image:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=85',desc:'เมล็ดพันธุ์ข้าวคุณภาพ เหมาะกับการเพาะปลูกในพื้นที่นา ให้เมล็ดข้าวหอมและผลผลิตดี'},
{id:3,name:'เมล็ดพันธุ์ทานตะวัน',category:'ดอกไม้',price:60,rating:4.9,reviews:76,stock:40,image:'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=700&q=85',desc:'เมล็ดพันธุ์ทานตะวัน ปลูกง่าย ดอกสีเหลืองสดใส เหมาะกับสวนและแปลงดอกไม้'},
{id:4,name:'เมล็ดพันธุ์พริกขี้หนู',category:'ผักสวนครัว',price:35,rating:4.6,reviews:64,stock:80,image:'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=700&q=85',desc:'เมล็ดพันธุ์พริกขี้หนู ให้ผลดก เผ็ดหอม เหมาะสำหรับปลูกในกระถางหรือแปลงผัก'},
{id:5,name:'เมล็ดพันธุ์แตงกวา',category:'ผักสวนครัว',price:50,rating:4.7,reviews:83,stock:60,image:'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=700&q=85',desc:'เมล็ดพันธุ์แตงกวา โตเร็ว ให้ผลสม่ำเสมอ เหมาะสำหรับปลูกเพื่อบริโภคและจำหน่าย'},
{id:6,name:'เมล็ดพันธุ์มะม่วง',category:'ไม้ผล',price:150,rating:4.8,reviews:72,stock:25,image:'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=85',desc:'เมล็ดพันธุ์มะม่วงสำหรับผู้ที่ต้องการปลูกไม้ผลในสวน ควรดูแลให้เหมาะกับสภาพพื้นที่'},
{id:7,name:'เมล็ดพันธุ์ผักสลัด',category:'ผักสวนครัว',price:40,rating:4.8,reviews:51,stock:70,image:'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=700&q=85',desc:'เมล็ดพันธุ์ผักสลัด เหมาะกับการปลูกในแปลงหรือระบบไฮโดรโปนิกส์'},
{id:8,name:'เมล็ดพันธุ์ดอกบานชื่น',category:'ดอกไม้',price:55,rating:4.6,reviews:43,stock:35,image:'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85',desc:'ดอกบานชื่นสีสันสดใส ปลูกง่าย ออกดอกต่อเนื่อง เหมาะสำหรับจัดสวน'},
{id:9,name:'เมล็ดพันธุ์กะเพรา',category:'สมุนไพร',price:30,rating:4.9,reviews:88,stock:90,image:'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=700&q=85',desc:'เมล็ดพันธุ์กะเพรากลิ่นหอม ปลูกได้ง่าย ใช้ประกอบอาหารไทยได้หลากหลาย'}
];
const categories=[['ผักสวนครัว','🥬'],['พืชไร่','🌾'],['ไม้ผล','🍅'],['ดอกไม้','🌼'],['สมุนไพร','🌿']];
const load=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
let products=load('seedshop_products',seedProducts),cart=load('seedshop_cart',[]),orders=load('seedshop_orders',[]),favorites=load('seedshop_favs',[]),activeCategory='ทั้งหมด',currentProduct=products[0]?.id;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>'฿ '+Number(n).toLocaleString('th-TH');
const save=()=>{localStorage.setItem('seedshop_products',JSON.stringify(products));localStorage.setItem('seedshop_cart',JSON.stringify(cart));localStorage.setItem('seedshop_orders',JSON.stringify(orders));localStorage.setItem('seedshop_favs',JSON.stringify(favorites))};
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2400)}
function go(page){$$('.page').forEach(p=>p.classList.toggle('active',p.id===page));$$('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page));if(page==='catalog')renderCatalog();if(page==='checkout')renderCart();if(page==='admin')renderAdmin();if(page==='profile')renderProfile();window.scrollTo({top:0,behavior:'smooth'})}
function productCard(p){return `<article class="product"><div class="photo" data-detail="${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80'"><button class="heart" data-fav="${p.id}" aria-label="รายการโปรด">${favorites.includes(p.id)?'♥':'♡'}</button></div><div class="product-body"><h3 data-detail="${p.id}">${p.name}</h3><span class="tag">${p.category}</span><div class="price">${money(p.price)}</div><div class="product-foot"><span class="rating">★ <b>${p.rating}</b> <span>(${p.reviews})</span></span><button class="btn small" data-add="${p.id}">ส่งซื้อ</button></div></div></article>`}
function renderCategories(){ $('#categories').innerHTML=categories.map(([name,emoji])=>{let img=products.find(p=>p.category===name)?.image||products[0].image;return `<button class="category" data-category="${name}"><img src="${img}" alt="${name}"><span>${name}</span></button>`}).join('');$('#sideCats').innerHTML=['ทั้งหมด',...categories.map(c=>c[0])].map(c=>`<button class="side-cat ${activeCategory===c?'active':''}" data-category="${c}">${c==='ทั้งหมด'?'◉':categories.find(x=>x[0]===c)?.[1]||'🌱'}　${c}</button>`).join('')}
function renderFeatured(){$('#featured').innerHTML=products.slice(0,3).map(productCard).join('')}
function renderCatalog(){let q=$('#globalSearch').value.trim().toLowerCase(),max=Number($('#maxPrice').value||500),stock=$('#inStock').checked;let list=products.filter(p=>(activeCategory==='ทั้งหมด'||p.category===activeCategory)&&(!q||p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q))&&p.price<=max&&(!stock||p.stock>0));let sort=$('#sortBy').value;if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);if(sort==='rating')list.sort((a,b)=>b.rating-a.rating);$('#productCount').textContent=`(${list.length} รายการ)`;$('#catalogProducts').innerHTML=list.length?list.map(productCard).join():'<div class="empty" style="grid-column:1/-1"><div class="emoji">🔎</div>ไม่พบสินค้าที่ตรงกับการค้นหา</div>';renderCategories()}
function renderDetail(id){let p=products.find(x=>x.id===Number(id));if(!p)return;currentProduct=p.id;$('#detailContent').innerHTML=`<div style="padding:16px 22px 0;color:var(--muted);font-size:12px">หน้าแรก　›　${p.category}　›　${p.name}</div><div class="detail-layout"><div><img class="gallery-main" id="detailImage" src="${p.image}" alt="${p.name}"><div class="thumbs"><img src="${p.image}" data-thumb="${p.image}"><img src="${products[(products.indexOf(p)+1)%products.length].image}" data-thumb="${products[(products.indexOf(p)+1)%products.length].image}"><img src="${products[(products.indexOf(p)+2)%products.length].image}" data-thumb="${products[(products.indexOf(p)+2)%products.length].image}"></div></div><div class="detail-info"><span class="tag">${p.category}</span><h1>${p.name}</h1><div class="rating">★ ${p.rating} <span>(${p.reviews} รีวิว)</span></div><div class="detail-price">${money(p.price)}</div><ul class="checks"><li>เมล็ดพันธุ์คุณภาพสูง</li><li>อัตราการงอกดีเมื่อดูแลเหมาะสม</li><li>เหมาะสำหรับปลูกในประเทศไทย</li><li>สินค้าคงเหลือ ${p.stock} ชุด</li></ul><b>จำนวน</b><br><div class="qty"><button id="detailMinus">−</button><span id="detailQty">1</span><button id="detailPlus">＋</button></div><div class="detail-actions"><button class="btn" id="detailBuy">สั่งซื้อ</button><button class="btn secondary" id="detailAdd">🛒 เพิ่มในตะกร้า</button><button class="btn secondary" data-fav="${p.id}">${favorites.includes(p.id)?'♥':'♡'} รายการโปรด</button></div><div class="seller-card"><div class="seller-icon">🌱</div><div style="flex:1"><b>ร้านเกษตรสุขใจ</b><div class="rating">★ 4.9 <span>(1.2k รีวิว)</span></div></div><button class="btn secondary small" data-page="profile">ดูร้านค้า</button></div></div></div><div class="detail-description"><h3>รายละเอียดสินค้า</h3>${p.desc}</div>`;let qty=1;$('#detailMinus').onclick=()=>{qty=Math.max(1,qty-1);$('#detailQty').textContent=qty};$('#detailPlus').onclick=()=>{qty=Math.min(p.stock||99,qty+1);$('#detailQty').textContent=qty};$('#detailAdd').onclick=()=>addCart(p.id,qty);$('#detailBuy').onclick=()=>{addCart(p.id,qty,true);go('checkout')};go('detail')}
function addCart(id,qty=1,quiet=false){let p=products.find(x=>x.id===Number(id));if(!p||p.stock<1){toast('สินค้าหมด');return}let row=cart.find(x=>x.id===p.id);if(row)row.qty=Math.min(p.stock,row.qty+qty);else cart.push({id:p.id,qty:Math.min(p.stock,qty)});save();renderCartCount();if(!quiet)toast('เพิ่มสินค้าในตะกร้าแล้ว')}
function changeQty(id,delta){let row=cart.find(x=>x.id===Number(id)),p=products.find(x=>x.id===Number(id));if(!row)return;row.qty=Math.min(p?.stock||99,row.qty+delta);if(row.qty<=0)cart=cart.filter(x=>x.id!==Number(id));save();renderCart();renderCartCount()}
function renderCartCount(){$('#cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderCart(){let rows=cart.map(r=>({...r,p:products.find(p=>p.id===r.id)})).filter(r=>r.p);let subtotal=rows.reduce((s,r)=>s+r.p.price*r.qty,0),shipping=rows.length?35:0;$('#cartSubtitle').textContent=`(${rows.reduce((s,r)=>s+r.qty,0)} รายการ)`;$('#cartItems').innerHTML=rows.length?rows.map(r=>`<div class="cart-row"><img src="${r.p.image}" alt="${r.p.name}"><div><strong>${r.p.name}</strong><span>${money(r.p.price)}</span><div class="qty"><button data-qty="${r.p.id}" data-delta="-1">−</button><span>${r.qty}</span><button data-qty="${r.p.id}" data-delta="1">＋</button></div></div><b>${money(r.p.price*r.qty)} <button class="link" data-remove="${r.p.id}" title="ลบ">🗑</button></b></div>`).join(''):'<div class="empty"><div class="emoji">🛒</div>ยังไม่มีสินค้าในตะกร้า<br><button class="btn" data-page="catalog" style="margin-top:15px">เลือกซื้อสินค้า</button></div>';$('#shipping').textContent=money(shipping);$('#grandTotal').textContent=money(subtotal+shipping)}
function renderAdmin(){$('#adminRows').innerHTML=products.map(p=>`<tr><td><img src="${p.image}" alt="">${p.name}</td><td>${money(p.price)}</td><td>${p.stock}</td><td><span class="status">${p.stock?'มีสินค้า':'สินค้าหมด'}</span></td><td><button class="link" data-edit="${p.id}">✎</button><button class="link" data-delete="${p.id}">♲</button></td></tr>`).join('');$('#statProducts').textContent=products.length+' รายการ';$('#statStock').textContent=money(products.reduce((s,p)=>s+p.price*p.stock,0));$('#statOrders').textContent=orders.length+' รายการ'}
function renderProfile(){$('#profileOrders').textContent=orders.length+' รายการ';$('#profileSpend').textContent=money(orders.reduce((s,o)=>s+o.total,0));$('#profileFavorites').textContent=favorites.length+' รายการ';$('#orderHistory').innerHTML=orders.length?[...orders].reverse().map(o=>`<div style="padding:10px 0;border-bottom:1px solid var(--line)"><b>คำสั่งซื้อ #${o.id}</b><span class="muted"> · ${o.date}</span><div>${o.items} รายการ · ${money(o.total)} · ${o.payment}</div></div>`).join(''):'ยังไม่มีคำสั่งซื้อ'}
function openModal(p){$('#productForm').reset();$('#productForm').elements.id.value=p?.id||'';$('#modalTitle').textContent=p?'แก้ไขสินค้า':'เพิ่มสินค้า';if(p){for(let k of ['name','category','price','stock','image'])$('#productForm').elements[k].value=p[k]??''}$('#modalBackdrop').classList.add('show')}
document.addEventListener('click',e=>{let nav=e.target.closest('[data-page]');if(nav){go(nav.dataset.page);return}let cat=e.target.closest('[data-category]');if(cat){activeCategory=cat.dataset.category;go('catalog');renderCatalog();return}let det=e.target.closest('[data-detail]');if(det){renderDetail(det.dataset.detail);return}let add=e.target.closest('[data-add]');if(add){addCart(add.dataset.add);return}let fav=e.target.closest('[data-fav]');if(fav){let id=Number(fav.dataset.fav);favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];save();renderCatalog();renderFeatured();if($('#detail').classList.contains('active'))renderDetail(id);toast(favorites.includes(id)?'เพิ่มในรายการโปรดแล้ว':'นำออกจากรายการโปรดแล้ว');return}let q=e.target.closest('[data-qty]');if(q){changeQty(q.dataset.qty,Number(q.dataset.delta));return}let rem=e.target.closest('[data-remove]');if(rem){cart=cart.filter(x=>x.id!==Number(rem.dataset.remove));save();renderCart();renderCartCount();return}let edit=e.target.closest('[data-edit]');if(edit){openModal(products.find(p=>p.id===Number(edit.dataset.edit)));return}let del=e.target.closest('[data-delete]');if(del){if(confirm('ต้องการลบสินค้านี้ใช่หรือไม่?')){products=products.filter(p=>p.id!==Number(del.dataset.delete));cart=cart.filter(r=>r.id!==Number(del.dataset.delete));save();renderAdmin();renderCategories();toast('ลบสินค้าแล้ว')}return}let thumb=e.target.closest('[data-thumb]');if(thumb){$('#detailImage').src=thumb.dataset.thumb;return}});
$$('[data-page]').forEach(b=>b.addEventListener('keydown',e=>{if(e.key==='Enter')go(b.dataset.page)}));
$('#globalSearch').addEventListener('input',()=>{if(!$('#catalog').classList.contains('active'))go('catalog');renderCatalog()});
$('#sortBy').addEventListener('change',renderCatalog);$('#maxPrice').addEventListener('input',()=>{$('#maxPriceLabel').textContent=$('#maxPrice').value;renderCatalog()});$('#inStock').addEventListener('change',renderCatalog);
$('#resetFilters').onclick=()=>{activeCategory='ทั้งหมด';$('#globalSearch').value='';$('#maxPrice').value=500;$('#maxPriceLabel').textContent='500';$('#inStock').checked=true;$('#sortBy').value='recommended';renderCatalog()};
$('#checkoutForm').addEventListener('submit',e=>{e.preventDefault();if(!cart.length){toast('กรุณาเลือกสินค้าก่อน');return}let form=new FormData(e.target),items=cart.reduce((s,r)=>s+r.qty,0),total=cart.reduce((s,r)=>s+(products.find(p=>p.id===r.id)?.price||0)*r.qty,35);let order={id:Date.now().toString().slice(-6),date:new Date().toLocaleDateString('th-TH'),items,total,payment:form.get('payment'),name:form.get('fullname'),phone:form.get('phone'),address:form.get('address')};orders.push(order);cart.forEach(r=>{let p=products.find(p=>p.id===r.id);if(p)p.stock=Math.max(0,p.stock-r.qty)});cart=[];save();renderCartCount();renderCart();renderAdmin();renderProfile();e.target.reset();toast('สั่งซื้อสำเร็จ (โหมดทดลอง)');go('profile')});
$('#addProductBtn').onclick=()=>openModal();$('#closeModal').onclick=()=>$('#modalBackdrop').classList.remove('show');$('#modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')$('#modalBackdrop').classList.remove('show')});
$('#productForm').addEventListener('submit',e=>{e.preventDefault();let f=new FormData(e.target),id=f.get('id'),p={id:id?Number(id):Math.max(0,...products.map(x=>x.id))+1,name:f.get('name').trim(),category:f.get('category'),price:Number(f.get('price')),stock:Number(f.get('stock')),rating:4.8,reviews:0,image:f.get('image')||'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80',desc:'เมล็ดพันธุ์คุณภาพ เหมาะสำหรับการเพาะปลูกและดูแลตามคำแนะนำ'};if(id)products=products.map(x=>x.id===Number(id)?{...x,...p}:x);else products.push(p);save();$('#modalBackdrop').classList.remove('show');renderAdmin();renderCategories();renderFeatured();renderCatalog();toast('บันทึกสินค้าเรียบร้อย')});
$('#editProfile').onclick=()=>{let n=prompt('ชื่อ-นามสกุล', $('#profileName').textContent);if(n===null)return;if(n.trim())$('#profileName').textContent=n.trim();let em=prompt('อีเมล',$('#profileEmail').textContent);if(em!==null&&em.trim())$('#profileEmail').textContent=em.trim();toast('อัปเดตข้อมูลบนหน้าจอแล้ว')};
renderCategories();renderFeatured();renderCatalog();renderCartCount();renderCart();renderAdmin();renderProfile();


// Demo login/register: accounts are stored only in this browser's localStorage.
// This is not secure production authentication; use a backend/auth provider for real users.
const AUTH_USERS_KEY = 'seedshop_demo_users';
const AUTH_SESSION_KEY = 'seedshop_demo_session';
const getAuthUsers = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || []; }
  catch { return []; }
};
const getAuthSession = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY)) || null; }
  catch { return null; }
};
let authSession = getAuthSession();

function setAuthTab(tab) {
  const isLogin = tab === 'login';
  $$('.auth-tab').forEach(b => b.classList.toggle('active', b.dataset.authTab === tab));
  $('#loginForm').hidden = !isLogin;
  $('#registerForm').hidden = isLogin;
  $('#loggedInPanel').hidden = true;
  $('#authTitle').textContent = isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก';
  $('#loginError').textContent = '';
  $('#registerError').textContent = '';
}
function updateAccountUI() {
  const button = $('#accountButton');
  if (!button) return;
  if (authSession) {
    $('#accountAvatar').textContent = '👩🏻';
    button.setAttribute('aria-label', 'บัญชีผู้ใช้ ' + authSession.name);
    button.title = authSession.name + ' — คลิกเพื่อดูบัญชี';
  } else {
    $('#accountAvatar').textContent = '👤';
    button.setAttribute('aria-label', 'เข้าสู่ระบบ');
    button.title = 'เข้าสู่ระบบ / สมัครสมาชิก';
  }
}
function openAuth() {
  $('#authBackdrop').classList.add('show');
  $('#authBackdrop').setAttribute('aria-hidden', 'false');
  if (authSession) {
    $('#loginForm').hidden = true;
    $('#registerForm').hidden = true;
    $$('.auth-tab').forEach(b => b.classList.remove('active'));
    $('#authTitle').textContent = 'บัญชีของฉัน';
    $('#loggedInPanel').hidden = false;
    $('#loggedInName').textContent = 'สวัสดี ' + authSession.name;
    $('#loggedInEmail').textContent = authSession.email;
  } else {
    setAuthTab('login');
  }
}
function closeAuth() {
  $('#authBackdrop').classList.remove('show');
  $('#authBackdrop').setAttribute('aria-hidden', 'true');
}
$('#accountButton').addEventListener('click', openAuth);
$('#closeAuth').addEventListener('click', closeAuth);
$('#authBackdrop').addEventListener('click', e => {
  if (e.target.id === 'authBackdrop') closeAuth();
});
$$('[data-auth-tab]').forEach(button => button.addEventListener('click', () => setAuthTab(button.dataset.authTab)));

$('#registerForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim().toLowerCase();
  const password = String(form.get('password') || '');
  const confirm = String(form.get('confirm') || '');
  const error = $('#registerError');
  error.textContent = '';
  if (password.length < 6) { error.textContent = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'; return; }
  if (password !== confirm) { error.textContent = 'รหัสผ่านและการยืนยันไม่ตรงกัน'; return; }
  const users = getAuthUsers();
  if (users.some(user => user.email === email)) { error.textContent = 'อีเมลนี้สมัครสมาชิกแล้ว กรุณาเข้าสู่ระบบ'; return; }
  users.push({name, email, password});
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
  authSession = {name, email};
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authSession));
  $('#registerForm').reset();
  updateAccountUI();
  openAuth();
  toast('สมัครสมาชิกสำเร็จ');
});

$('#loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const email = String(form.get('email') || '').trim().toLowerCase();
  const password = String(form.get('password') || '');
  const user = getAuthUsers().find(item => item.email === email && item.password === password);
  if (!user) { $('#loginError').textContent = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'; return; }
  authSession = {name: user.name, email: user.email};
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authSession));
  $('#loginForm').reset();
  updateAccountUI();
  openAuth();
  toast('เข้าสู่ระบบสำเร็จ');
});

$('#logoutButton').addEventListener('click', () => {
  authSession = null;
  localStorage.removeItem(AUTH_SESSION_KEY);
  updateAccountUI();
  closeAuth();
  toast('ออกจากระบบแล้ว');
});
$('#goProfile').addEventListener('click', () => {
  closeAuth();
  go('profile');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAuth();
});
updateAccountUI();
