console.log('Nyan!')

var DEFAULT_FLAG = 'srb'

var FLAG_SCHEMES = {
	rainbow: { stripes: ['#f00', '#f90', '#ff0', '#3f0', '#09f', '#63f'], fur: '#999' },
	srb:     { stripes: ['#C6363C', '#C6363C', '#0C4076', '#0C4076', '#FFFFFF', '#FFFFFF'], fur: '#999', body: '#D4941A', cream: '#F0A500', sprinkle: '#FFF8DC',
	           sprinkleSize: '48px 18px, 6px 12px, 6px 34px, 6px 34px, 42px 6px, 12px 6px, 6px 12px, 12px 6px, 6px 6px, 6px 6px',
	           sprinklePosition: '24px 10px, 69px 20px, 27px 28px, 63px 28px, 27px 62px, 15px 38px, 15px 44px, 15px 56px, 40px 46px, 52px 34px' },
	kz:      { stripes: ['#FEC400', '#00AFCA', '#00AFCA', '#00AFCA', '#00AFCA', '#FEC400'], fur: '#00AFCA', body: '#00AFCA', cream: '#00AFCA', sprinkle: '#FEC400',
	           sprinkleSize: '12px 12px, 6px 6px, 6px 6px, 6px 6px, 6px 6px, 6px 6px, 6px 6px, 6px 6px, 6px 6px, 6px 6px',
	           sprinklePosition: '40px 34px, 44px 22px, 44px 52px, 28px 38px, 60px 38px, 32px 26px, 56px 26px, 32px 50px, 56px 50px, 44px 38px' },
	uk:      { stripes: ['#CF142B', '#FFF', '#00247D', '#00247D', '#FFF', '#CF142B'], fur: '#999' },
	ua:      { stripes: ['#005BBB', '#005BBB', '#005BBB', '#FFD500', '#FFD500', '#FFD500'], fur: '#999' },
	us:      { stripes: ['#B31942', '#FFF', '#B31942', '#0A3161', '#FFF', '#0A3161'], fur: '#999' },
	jp:      { stripes: ['#FFF', '#FFF', '#BC002D', '#BC002D', '#FFF', '#FFF'], fur: '#999' },
	de:      { stripes: ['#000', '#000', '#DD0000', '#DD0000', '#FFCE00', '#FFCE00'], fur: '#999', body: '#D4941A', cream: '#F0A500', sprinkle: '#FFF8DC',
	           sprinkleSize: '48px 18px, 6px 12px, 6px 34px, 6px 34px, 42px 6px, 12px 6px, 6px 12px, 12px 6px, 6px 6px, 6px 6px',
	           sprinklePosition: '24px 10px, 69px 20px, 27px 28px, 63px 28px, 27px 62px, 15px 38px, 15px 44px, 15px 56px, 40px 46px, 52px 34px' },
	fr:      { stripes: ['#002395', '#002395', '#FFF', '#FFF', '#ED2939', '#ED2939'], fur: '#999' },
	it:      { stripes: ['#009246', '#009246', '#FFF', '#FFF', '#CE2B37', '#CE2B37'], fur: '#999' },
	am:      { stripes: ['#D90012', '#D90012', '#0033A0', '#0033A0', '#F2A800', '#F2A800'], fur: '#ffffff' }
}

function getFlagFromURL () {
	var params = new URLSearchParams(window.location.search)
	return params.get('flag')
}

function applyFlagScheme (flag) {
	if (!flag || !FLAG_SCHEMES[flag]) return
	var scheme = FLAG_SCHEMES[flag]
	var root = document.documentElement
	for (var i = 0; i < scheme.stripes.length; i++) {
		root.style.setProperty('--stripe-' + (i + 1), scheme.stripes[i])
	}
	root.style.setProperty('--fur-color', scheme.fur)
	if (scheme.body) root.style.setProperty('--body-color', scheme.body)
	if (scheme.cream) root.style.setProperty('--body-cream', scheme.cream)
	if (scheme.sprinkle) root.style.setProperty('--body-sprinkle', scheme.sprinkle)
	if (scheme.sprinkleSize || scheme.sprinklePosition) {
		var cream = document.getElementById('pop-tarts-body-cream')
		if (scheme.sprinkleSize) cream.style.backgroundSize = scheme.sprinkleSize
		if (scheme.sprinklePosition) cream.style.backgroundPosition = scheme.sprinklePosition
	}
}

function cycleFrames (_nyanCat, _currentFrame) {
	_nyanCat.classList = []
	_nyanCat.classList.add(`frame${_currentFrame}`)
}

function replicateSparks (_sparksRow) {
	const numberOfRowsToCoverEntireScreen = Math.ceil(document.body.offsetHeight / _sparksRow.offsetHeight)
	const newSparksRows = document.createElement('div')

	for (let a = 0; a < numberOfRowsToCoverEntireScreen-1; a++) {
		newSparksRows.append(_sparksRow.cloneNode(true))
	}

	document.body.prepend(newSparksRows)
}

(function () {
	applyFlagScheme(getFlagFromURL() || DEFAULT_FLAG)
	let nyanCat = document.getElementById('nyan-cat')
	let currentFrame = 1

	replicateSparks(document.getElementsByClassName('sparks-combo')[0])

	setInterval(function () {
		currentFrame = (currentFrame % 6) + 1
		cycleFrames(nyanCat, currentFrame)
	}, 70)
})()
