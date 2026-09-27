"""Compose original lightweight SVG environments around the existing world objects."""
import json, re
from pathlib import Path
root = Path(__file__).resolve().parents[1]
worlds = root / 'assets/worlds'
scenes = {
 'financeira': ('#DCEDE1', '<path d="M45 150V90L90 58l45 32v60Z"/><path d="M425 125V70h80v100h-80M438 89h12m15 0h12m-39 24h12m15 0h12"/><path d="m438 248 22-20 22 6 30-42"/>'),
 'digital': ('#E1EAF1', '<rect x="42" y="70" width="90" height="64" rx="7"/><path d="M60 149h54m-27-15v15M451 90c-24-30-48 4-34 21h78c28-14 6-51-20-33"/><rect x="438" y="202" width="42" height="70" rx="8"/><path d="M452 258h14"/>'),
 'alimentar': ('#F4E5D9', '<path d="M32 255h505M65 275v-20m420 20v-20"/><path d="M65 87c-25-30-51 22-20 53 29 21 58-37 29-52m-10 0 10-21"/><path d="M445 180h40l-7 65h-26Z M447 205h35"/><path d="m434 98 46-17 16 35-46 17Z"/>'),
 'cientifica': ('#E7E0F2', '<path d="M55 65v62c0 29 39 29 39 0V65m-45 0h52m-42 42h31"/><path d="m439 73-17 32 26 15 17-32Zm-13 44c-23 29-2 69 29 59m-39 12h73m-36-66 17 14"/><path d="M54 238h60m-54-17v17m20-42v42m20-58v58"/>'),
 'ambiental': ('#E2EBCF', '<path d="m70 47-38 63h24l-32 46h91l-32-46h23Zm0 109v25"/><path d="m460 182-40 58h80Zm0 58v30M32 239q35-23 68 0t68 0"/><path d="m453 65-20 38h24l-14 37 47-50h-26l10-25Z"/>'),
 'juridica': ('#E8E2D6', '<path d="m32 98 60-39 60 39Zm12 65h98M54 112v40m35-40v40m35-40v40"/><path d="M435 67h67v91h-67Zm12 22h42m-42 17h42m-42 17h25"/><circle cx="471" cy="225" r="23"/><path d="m459 245-5 25 17-9 17 9-5-25"/>'),
 'mediatica': ('#F4DED9', '<rect x="32" y="75" width="100" height="77" rx="3"/><path d="M45 92h74m-74 18h30m-30 17h30m15-18h29v24H90Z"/><rect x="446" y="66" width="26" height="57" rx="13"/><path d="M435 103c0 40 48 40 48 0m-24 29v24m-16 0h32"/><path d="m438 220 55-18v46l-55-18Zm7 12 10 27"/>'),
 'civica': ('#E4E4F2', '<path d="M28 270h512M32 252l70-38m386 38-70-38"/><circle cx="69" cy="102" r="14"/><path d="M43 161v-21c0-29 52-29 52 0v21m-36 0v25m20-25v25"/><rect x="426" y="72" width="84" height="64" rx="12"/><path d="M438 85h24v23h-24Zm34 0h24v23h-24Z"/><circle cx="444" cy="140" r="9"/><circle cx="492" cy="140" r="9"/>'),
 'ia': ('#E9E2F1', '<rect x="41" y="79" width="63" height="63" rx="8"/><path d="M56 66v13m17-13v13m17-13v13m-34 63v13m17-13v13m17-13v13M28 96h13m-13 28h13m63-28h13m-13 28h13"/><path d="M431 62h82v61h-45l-20 17v-17h-17Zm12 20h56m-56 19h39"/><path d="m442 220 20 19 43-43"/>'),
 'seguranca': ('#F2E0D9', '<path d="m34 130 50-44 50 44m-87-8v60h74v-60m-49 60v-35h24v35"/><path d="M441 66h57v67h-57Zm11 33h34m-10-10 10 10-10 10"/><path d="m435 242 32-58 33 58Z M467 201v19m0 10v1"/>')
}
for key, (soft, context) in scenes.items():
    art = re.sub(r'^<svg[^>]*>|</svg>\s*$', '', (worlds/f'{key}.svg').read_text())
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="560" height="330" viewBox="0 0 560 330"><ellipse cx="280" cy="220" rx="260" ry="95" fill="{soft}"/><path d="M20 220v14c65 122 455 122 520 0v-14c-65 120-455 120-520 0Z" fill="#183B37" opacity=".10"/><g fill="none" stroke="#315D54" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">{context}</g><g transform="translate(130 0)">{art}</g></svg>'
    (worlds/f'{key}-scene.svg').write_text(svg)
print('10 original SVG environments generated')
