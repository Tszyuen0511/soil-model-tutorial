const chapterPages = {
  overview: [1,2,3,4,5,6,7], data: [8,9,10,11], surfaces: [12,13,14,15,16],
  sections: [17,18,19,20], export: [21,22,23], projects: [24,25,26], troubleshooting: [27]
};
let currentPDFPage = 1;

function tutorialDisplay(chapter) {
  const pages = chapterPages[chapter];
  if (!pages) return;
  const container = document.getElementById('content');
  const section = document.createElement('section');
  section.className = 'original-tutorial';
  section.innerHTML = `<div class="section-head"><h2>Original tutorial pages</h2><span class="pdf-count">${pages.length} pages</span></div>
    <p class="pdf-description">Complete pages from your tutorial, including every screenshot and annotation. Page numbers follow the PDF order. Select a page to enlarge it.</p>
    ${pages.map(n=>{const p=tutorialPages.pages[n-1];return `<figure class="pdf-page" id="pdf-page-${n}"><figcaption><span>PDF page ${n} / ${tutorialPages.page_count}</span><button type="button" onclick="openPDFPage(${n})" aria-label="Enlarge PDF page ${n}">Enlarge ↗</button></figcaption><button type="button" class="pdf-image-button" onclick="openPDFPage(${n})" aria-label="View complete PDF page ${n}"><img src="${p.image}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async" alt="Complete original tutorial page ${n}, including screenshots and annotations"></button></figure>`}).join('')}`;
  const article=container.querySelector('article');
  if(article){article.insertBefore(section,article.querySelector('.next'));}
  else container.insertBefore(section,container.querySelector('footer'));
}

function openPDFPage(number) {
  currentPDFPage = Math.max(1,Math.min(tutorialPages.page_count,Number(number)));
  const dialog=document.getElementById('page-viewer');
  document.getElementById('pdf-page-select').value=currentPDFPage;
  document.getElementById('pdf-previous').disabled=currentPDFPage===1;
  document.getElementById('pdf-next').disabled=currentPDFPage===tutorialPages.page_count;
  const image=document.getElementById('pdf-large-image');
  image.src=tutorialPages.pages[currentPDFPage-1].image;
  image.alt=`Complete PDF tutorial page ${currentPDFPage}`;
  document.getElementById('pdf-zoom').value='100';
  setPDFZoom();
  if(!dialog.open)dialog.showModal();
  document.querySelector('.pdf-view-scroll').scrollTo(0,0);
}

function setPDFZoom() {
  document.getElementById('pdf-large-image').style.width=document.getElementById('pdf-zoom').value+'%';
}

document.getElementById('pdf-page-select').innerHTML=tutorialPages.pages.map(p=>`<option value="${p.page}">Page ${p.page} / ${tutorialPages.page_count}</option>`).join('');
document.getElementById('page-viewer').addEventListener('keydown',event=>{
  if(event.target.tagName==='SELECT')return;
  if(event.key==='ArrowLeft'){event.preventDefault();openPDFPage(currentPDFPage-1)}
  if(event.key==='ArrowRight'){event.preventDefault();openPDFPage(currentPDFPage+1)}
});
