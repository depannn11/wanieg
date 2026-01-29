<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Payment DKD STORE 11</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
<script src="https://unpkg.com/lucide@latest"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  font-family:'Poppins',sans-serif;
  background:#0f1115;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:40px 15px;
  min-height:100vh;
  color:#e5e;
}
.logo{
  width:220px;
  border-radius:28px;
  margin-bottom:20px;
  border:none;
  box-shadow:0 10px 25px rgba(0,0,0,0.6);
  transition:transform .3s,box-shadow .3s;
}
.logo:hover{
  transform:scale(1.07);
  box-shadow:0 14px 30px rgba(0,0,0,.8);
}
.name{
  font-size:28px;
  font-weight:800;
  margin-bottom:40px;
  text-transform:uppercase;
  position:relative;
  color:#fff;
  text-align:center;
}
.name::after{
  content:"";
  display:block;
  width:200px;height:4px;
  background:linear-gradient(90deg,white,white);
  margin:12px auto 0;
  border-radius:4px;
}
.card{
  width:100%;
  max-width:450px;
  background:#1c1f28;
  border-radius:22px;
  margin-bottom:25px;
  overflow:hidden;
  border:none;
  box-shadow:0 8px 28px rgba(0,0,0,.8);
  transition:.4s;
}
.card:hover{
  box-shadow:0 14px 38px rgba(0,0,0,.9);
  transform:translateY(-2px);
}
.qris-img{
  width:160px;
  max-width:100%;
  border-radius:20px;
  display:block;
  margin:22px auto 18px;
  box-shadow:0 8px 25px rgba(0,0,0,.8);
  transition:.3s;
}
.action-btn{
  margin:0 auto 22px;
  padding:14px 22px;
  background:#fff;
  border:none;
  border-radius:16px;
  font-size:15px;
  cursor:pointer;
  display:flex;align-items:center;gap:8px;
  color:#111;font-weight:600;
  transition:.3s;
}
.action-btn:hover{
  background:#e5e7eb;
  transform:translateY(-2px);
  box-shadow:0 6px 16px rgba(0,0,0,.5)
}
.info{
  background:#2a2d38;
  border-radius:18px;
  padding:22px;
  text-align:center;
  font-size:16px;
  color:#e5e7eb;
  line-height:1.6;
  box-shadow:0 6px 18px rgba(0,0,0,.7);
}
.toast{
  position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
  background:#111;color:#fff;padding:14px 20px;
  border-radius:14px;font-size:14px;opacity:0;
  pointer-events:none;transition:.3s
}
.toast.show{opacity:1}
.modal{
  position:fixed;top:0;left:0;width:100%;height:100%;
  background:rgba(0,0,0,0.9);
  display:flex;justify-content:center;align-items:center;
  opacity:0;pointer-events:none;transition:.3s
}
.modal.show{opacity:1;pointer-events:auto}
.modal-content{
  position:relative;
  background:#1c1f28;
  border-radius:24px;
  padding:22px;
  max-width:92%;max-height:92%;
  display:flex;flex-direction:column;align-items:center;
  box-shadow:0 12px 40px rgba(0,0,0,.85);
  animation:zoomIn .3s ease;
}
.modal-content img{
  width:100%;max-height:75vh;object-fit:contain;
  border-radius:18px;
}
.close-btn{
  margin-top:18px;
  padding:12px 22px;
  background:#ef4444;
  border:none;border-radius:16px;
  color:#fff;font-weight:600;
  cursor:pointer;transition:.3s
}
.close-btn:hover{background:#dc2626}
@keyframes zoomIn{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}
</style>
</head>
<body>

<img src="https://files.catbox.moe/3vchtw.jpg" alt="Logo" class="logo">

<div class="name">Payment DKD STORE 11</div>

<!-- QRIS langsung tampil -->
<div class="card">
  <h3 style="color:#fff;text-align:center;padding:18px 0;">PAYMENT QRIS</h3>
  <img src="https://files.catbox.moe/e6tsar.jpg" alt="QRIS" class="qris-img">
  <button class="action-btn" onclick="openModal()">
    <i data-lucide="maximize-2"></i> Perbesar Qris
  </button>
</div>

<!-- DANA -->
<div class="card">
  <h3 style="color:#fff;text-align:center;padding:18px 0;">PAYMENT DANA</h3>
  <div class="info">
    <p><b>Nama  :</b> -</p>
    <p><b>Nomor :</b> 082221744770</p>
    <button class="action-btn" onclick="copyNumber('082221744770')">
      <i data-lucide="copy"></i> Copy Number
    </button>
  </div>
</div>

<!-- OVO -->
<div class="card">
  <h3 style="color:#fff;text-align:center;padding:18px 0;">PAYMENT OVO</h3>
  <div class="info">
    <p><b>Nama  :</b> -</p>
    <p><b>Nomor :</b> 082221744770</p>
    <button class="action-btn" onclick="copyNumber('082221744770')">
      <i data-lucide="copy"></i> Copy Number
    </button>
  </div>
</div>

<!-- GOPAY -->
<div class="card">
  <h3 style="color:#fff;text-align:center;padding:18px 0;">PAYMENT GOPAY</h3>
  <div class="info">
    <p><b>Nama  :</b> Y*****h</p>
    <p><b>Nomor :</b> 082221744770</p>
    <button class="action-btn" onclick="copyNumber('082221744770')">
      <i data-lucide="copy"></i> Copy Number
    </button>
  </div>
</div>

<div id="toast" class="toast">Nomor berhasil disalin!</div>

<div id="qrisModal" class="modal">
  <div class="modal-content">
    <img src="https://files.catbox.moe/e6tsar.jpg" alt="QRIS Fullscreen">
    <button class="close-btn" onclick="closeModal()">Tutup</button>
  </div>
</div>

<script>
lucide.createIcons();
function copyNumber(num){
  navigator.clipboard.writeText(num).then(()=>{
    showToast("Nomor berhasil disalin!");
  });
}
function showToast(msg){
  const toast=document.getElementById("toast");
  toast.textContent=msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2000);
}
function openModal(){
  document.getElementById("qrisModal").classList.add("show");
}
function closeModal(){
  document.getElementById("qrisModal").classList.remove("show");
}
</script>

</body>
</html>
