"""Original, script-free Rive feedback. Compile with Rive CLI 1.2.0."""
from pathlib import Path
import xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
def shape(path, color, x=0, y=0, rotation=0):
    return f'<Shape x="{x}" y="{y}" rotation="{rotation}">{path}<Fill><SolidColor colorValue="FF{color}"/></Fill></Shape>'
def rect(w,h): return f'<Rectangle width="{w}" height="{h}" cornerRadiusTL="3"/>'
def circle(w): return f'<Ellipse width="{w}" height="{w}"/>'
check=shape(rect(23,7),'FFFFFF',-9,5,.75)+shape(rect(39,7),'FFFFFF',10,0,-.8)
star=shape('<Star width="48" height="48" points="5" innerRadius=".52"/>','FFFFFF')
plus=shape(rect(38,7),'FFFFFF')+shape(rect(7,38),'FFFFFF')
retry=shape('<Star width="46" height="46" points="3" innerRadius=".75"/>','FFFFFF')
error=shape(rect(7,27),'FFFFFF',0,-5)+shape(circle(7),'FFFFFF',0,19)
entries=[('success','047857',check),('error','A44631',error),('retry','8A6500',retry),('xp','047857',plus),('level','796300',star),('achievement','796300',star),('missionStarted','305BA5',retry),('missionCompleted','047857',check),('nodeUnlocked','305BA5',plus),('nodeCompleted','047857',check),('checkpoint','796300',star)]
entries += [
 ('financeira','047857',shape(rect(52,34),'FFFFFF')+shape(circle(10),'047857',16,0)),
 ('digital','305BA5',shape(rect(52,33),'FFFFFF',0,-5)+shape(rect(7,14),'FFFFFF',0,17)+shape(rect(30,5),'FFFFFF',0,24)),
 ('alimentar','B8512A',shape(circle(55),'FFFFFF')+shape(circle(37),'B8512A')+shape(circle(25),'FFFFFF')),
 ('cientifica','745397',shape('<Ellipse width="57" height="20"/>','FFFFFF',0,0,.7)+shape('<Ellipse width="57" height="20"/>','FFFFFF',0,0,-.7)+shape(circle(16),'745397')),
 ('ambiental','53732E',shape('<Ellipse width="28" height="48"/>','FFFFFF',-8,-5,-.6)+shape(rect(5,38),'FFFFFF',3,9,-.2)),
 ('juridica','796300',shape(rect(5,52),'FFFFFF')+shape(rect(52,5),'FFFFFF',0,-12)+shape('<Triangle width="25" height="18"/>','FFFFFF',-19,8)+shape('<Triangle width="25" height="18"/>','FFFFFF',19,8)),
 ('mediatica','A44631',shape(rect(48,56),'FFFFFF')+''.join(shape(rect(32,4),'A44631',0,y) for y in [-14,0,14])),
 ('civica','66568F',shape('<Triangle width="58" height="24"/>','FFFFFF',0,-22)+''.join(shape(rect(7,33),'FFFFFF',x,3) for x in [-20,0,20])+shape(rect(57,6),'FFFFFF',0,23)),
 ('ia','6C4CF1',''.join(shape(circle(14),'FFFFFF',x,y) for x,y in [(-22,-18),(22,-18),(0,0),(-22,22),(22,22)])),
 ('seguranca','A44631',shape(rect(45,30),'FFFFFF',0,-12)+shape('<Triangle width="45" height="40"/>','FFFFFF',0,11,3.14159)+shape(rect(6,25),'A44631')),
]
out=['<Rive version="1" kind="fragment">']
for i,(name,color,glyph) in enumerate(entries):
    n=i+1
    glyph="".join(ET.tostring(e,encoding="unicode") for e in reversed(list(ET.fromstring("<root>"+glyph+"</root>"))))
    out.append(f'<Artboard id="{n}:1" name="{name}" x="{i*180}" y="0" width="128" height="128" styleId="{n}:30" defaultStateMachineId="{n}:4"><LayoutComponentStyle id="{n}:30"/>')
    out.append(f'<Node id="{n}:2" x="64" y="64" name="Emblem">{glyph}{shape(circle(92),color)}</Node>')
    out.append(f'<StateMachine name="Feedback" id="{n}:4"><StateMachineLayer name="Once"><AnyState x="0" y="-140"/><ExitState x="400" y="-140"/><EntryState x="0" y="0"><StateTransition stateToId="{n}:5"/></EntryState><AnimationState x="200" y="0" animationId="{n}:3" id="{n}:5"/></StateMachineLayer></StateMachine>')
    for j,state in enumerate(['success','idle','hover','active','error','completed','locked']):
        aid=3 if j==0 else 10+j
        duration=27 if state=='success' else 15
        peak=1.08 if state in ['success','hover'] else .94 if state in ['active','error'] else 1
        out.append(f'<LinearAnimation name="{state}" id="{n}:{aid}" duration="{duration}" loopValue="oneShot"><KeyedObject objectId="{n}:2">')
        for key in [16,17]:
            out.append(f'<KeyedProperty propertyKey="{key}"><KeyFrameDouble frame="0" value=".85" interpolationType="linear"/><KeyFrameDouble frame="9" value="{peak}" interpolationType="linear"/><KeyFrameDouble frame="{duration}" value="1"/></KeyedProperty>')
        out.append('</KeyedObject></LinearAnimation>')
    out.append('</Artboard>')
out.append('</Rive>')
(root/'design/rive-feedback/scene.rml').write_text('\n'.join(out),encoding='utf-8')
