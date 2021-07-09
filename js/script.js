input.onkeyup= async event=>{
	if(event.keyCode==13){
		try{
		let response=await fetch(`https://api.quran.sutanlab.id/surah/${input.value}`)
		let javob=await response.json()
		let resp2=await fetch(`https://quranenc.com/api/translation/sura/uzbek_mansour/${input.value}`)
		let jav2=await resp2.json()
		let index=0
		text.style.color='black'
		oragan.innerHTML=null
		bos.style.color='blue'
		bos.textContent='Oyat ustiga bossangiz audiosi qo\'yiladi'
		text.textContent=javob.data.number+'.'+javob.data.name.transliteration.en
		for(let i=0;i<javob.data.verses.length;++i){
			let li=document.createElement('li')
			let audio=document.createElement('audio')
			let sorces=document.createElement('source')
			let h1=document.createElement('h1')
			let h2=document.createElement('h2')
			let br=document.createElement('br')
			audio.controls=false
			h1.textContent=javob.data.verses[i].text.arab
			h2.textContent=jav2.result[i].translation
			sorces.setAttribute('type','audio/mp3')
			sorces.src= javob.data.verses[i].audio.primary
			h1.onclick=()=>{
				wrapper.innerHTML=null
				bos.textContent=''
				wrapper.append(audio)
				audio.play()
				let actives=document.querySelectorAll('.active')
				actives.forEach(el=>el.classList.remove('active'))
				li.classList.add('active')
			}
			h1.style.cursor='pointer'
			li.append(audio)
			li.append(h1)
			li.append(h2)
			oragan.append(li)
			li.append(br)
			li.append(br)
			audio.append(sorces)
		}
		function funk(index){
			let actives=document.querySelectorAll('.active')
			actives.forEach(el=>el.classList.remove('active'))

			let items=document.querySelectorAll('li')
			items[index].classList.add('active')
			let audio=document.createElement('audio')
			let sorces=document.createElement('source')
			sorces.src=javob.data.verses[index].audio.primary
			audio.append(sorces)
			wrapper.append(audio)
			audio.play()
			audio.onended=()=>{
				if(index<javob.data.verses.length){
					return funk(index+1)
				}
			}
		}
		btn.onclick=()=>{
			wrapper.innerHTML=null
			bos.textContent=''
			funk(index)
		}
	}
	catch(error){
		if(error){
			text.style.color='red'
			text.textContent='Sura raqamini 1-114 oralig\'ida kiriting !'
			bos.textContent=''
		}
	}
	}
}

