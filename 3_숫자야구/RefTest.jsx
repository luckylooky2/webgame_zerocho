const React = require("react");
const { useRef } = React;

function RefTest() {
  const scrollRef = useRef(null);

  function handleClick() {
    scrollRef.current.scrollTop = 0;
  }

  return (
    <div>
      <button onClick={handleClick}>Scroll to top</button>
      <div ref={scrollRef} style={{ height: "200px", overflow: "auto" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem
          turpis, cursus mollis lobortis a, volutpat eu nisi. Sed sed ligula
          sem. Cras nec leo sed ante commodo elementum quis non nibh. Nam
          pharetra faucibus tortor sit amet pellentesque. Sed laoreet iaculis
          pulvinar. Morbi a dolor mi. Integer imperdiet feugiat metus at
          fermentum. Sed egestas id massa a sodales. Praesent at hendrerit ante.
          In sit amet odio eu sem eleifend consequat in vel purus. Nam hendrerit
          augue et porta imperdiet. Ut dapibus sapien nisi, quis rhoncus est
          luctus eget. Suspendisse interdum metus eu elit dapibus vehicula.
          Pellentesque pellentesque nisi egestas, tincidunt diam ut, convallis
          ex. Morbi ut laoreet risus, non consectetur ipsum. Nullam dapibus at
          justo ut rutrum. Donec semper, ante non euismod feugiat, erat elit
          lacinia dolor, id hendrerit nulla turpis vitae ante. Fusce lorem diam,
          tristique non lobortis quis, condimentum et massa. In imperdiet risus
          at diam ullamcorper, eu vulputate augue malesuada. Donec ut diam
          ligula. Nullam ac cursus libero, non luctus lacus. Morbi non metus a
          sem cursus vehicula eu et lectus. Nunc at gravida lorem. Suspendisse
          non orci nisi. Nam rutrum congue orci, at euismod erat ullamcorper
          sed. Phasellus et eleifend odio. Nullam luctus et libero id rutrum.
          Donec bibendum tincidunt gravida. Mauris purus eros, consectetur ac
          erat quis, pretium facilisis odio. Nam id quam faucibus, consequat
          neque a, molestie tortor. Phasellus aliquam diam quis quam iaculis, et
          blandit orci imperdiet. Sed ac odio in mauris placerat molestie.
          Maecenas a leo vitae mi consequat imperdiet non in magna. Sed in
          tellus dignissim nunc vulputate molestie eu vel tellus. Morbi nunc
          magna, malesuada et sagittis sit amet, tristique vulputate nibh.
          Maecenas lacus mi, viverra vel nunc non, porttitor mollis ex. Nullam
          venenatis ut lacus non finibus. Nam non enim non magna tempor mattis
          at at erat. Ut ac ligula dictum, fringilla dui vel, ornare erat. Nulla
          facilisi. Integer facilisis gravida lacus. Nam facilisis dui vitae
          tortor tincidunt, eu ornare eros scelerisque. Suspendisse placerat
          elit eu sem rhoncus vehicula. Nam ac enim sed quam varius mattis.
          Proin nec sem sollicitudin, elementum justo quis, venenatis tortor.
          Maecenas pulvinar purus eget neque fringilla laoreet. Sed a ex porta,
          condimentum enim et, pharetra risus. Sed semper, dui vitae semper
          sodales, risus sapien mattis lorem, in suscipit augue arcu ac enim.
          Sed hendrerit porttitor risus id ultricies. Praesent nisl purus,
          suscipit semper consequat luctus, bibendum non risus. Nunc sit amet
          tincidunt massa. Nunc justo eros, rhoncus eu leo eu, maximus ultrices
          mi. Nulla a libero ante. Maecenas gravida rhoncus consequat. Nullam
          pharetra, mauris quis molestie tincidunt, dolor sem bibendum ante, a
          interdum diam metus dictum mi. Nunc nec maximus justo, quis porta
          nunc. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Cras ultricies tristique erat. Nunc eros elit,
          interdum id lacus non, convallis finibus dolor. Fusce faucibus felis
          orci, molestie aliquam eros malesuada nec. Donec ex leo, malesuada
          vitae augue non, ultrices consectetur justo. Fusce non eros eu enim
          placerat convallis et sit amet magna. Aliquam congue urna eget odio
          imperdiet sagittis. Nulla scelerisque pretium sollicitudin. Duis nisi
          mi, convallis eget diam ut, vestibulum tincidunt orci. Pellentesque eu
          ornare mauris, nec faucibus elit. Vivamus dignissim eget nibh lacinia
          suscipit. Mauris elementum tortor ut egestas consequat. Nullam vitae
          ipsum a lorem hendrerit convallis. Phasellus interdum faucibus metus
          quis lacinia. Nam iaculis libero interdum mi lacinia pulvinar. Nunc
          scelerisque ligula magna, eu rutrum tortor ultrices quis. Nunc
          tincidunt odio justo, at mattis purus placerat a. Integer aliquet
          bibendum odio eu egestas. In dignissim sem eu lorem vestibulum
          hendrerit. Mauris elementum sollicitudin odio, ut accumsan est
          pulvinar auctor. Vestibulum dictum tortor eget massa elementum
          suscipit. Fusce vitae convallis nulla. Proin rhoncus vulputate varius.
          Suspendisse posuere libero ac urna pulvinar gravida. Sed vel dolor non
          nulla tempus commodo vehicula in est. Cras nec nunc quis ligula
          volutpat eleifend nec sed libero. Suspendisse vehicula finibus nunc,
          quis dignissim nisi accumsan non. Donec vulputate vel dui id
          facilisis. Quisque justo massa, pellentesque at dolor in, viverra
          consectetur quam. Pellentesque pharetra dui sit amet dui gravida
          rutrum. Nunc tristique scelerisque dolor, at euismod enim faucibus eu.
          Duis at magna risus. Integer feugiat magna justo, consectetur auctor
          nulla suscipit in. Cras a nulla ut nulla interdum convallis non ut
          neque. Curabitur feugiat mauris vel erat bibendum, ut blandit lorem
          sagittis. Sed ut nunc quis justo vestibulum commodo. Morbi suscipit
          neque sit amet elit faucibus tempor. Suspendisse nisl mauris, ultrices
          ut tincidunt sit amet, vehicula at enim. Vestibulum dignissim iaculis
          nibh, nec gravida lacus. Duis blandit, purus eget auctor posuere,
          nulla purus eleifend tortor, vel aliquet dolor erat sed sapien. Proin
          at erat orci. Fusce tempus nibh at augue condimentum, id fermentum
          nibh dictum. Nullam et pellentesque magna. Mauris erat justo, accumsan
          eu justo ut, congue laoreet sem. Morbi luctus volutpat lectus semper
          ornare. Pellentesque pharetra porttitor dolor, at elementum odio
          mollis a. Integer vitae mollis lorem, sit amet consectetur turpis.
          Pellentesque dapibus eget justo sed sollicitudin. Curabitur ex nunc,
          maximus eu efficitur nec, finibus a lectus. Sed laoreet tristique quam
          ac placerat. Nunc sed porta ex. Nullam eu massa elementum, blandit
          sapien eget, luctus ex. Nam aliquam bibendum dui vel elementum. Morbi
          ullamcorper neque sagittis, aliquet leo at, interdum lacus. Sed id
          sapien vitae leo sodales facilisis. Praesent sagittis, ante eu aliquet
          rhoncus, sapien velit tincidunt tortor, sit amet euismod risus orci
          nec metus. Nunc placerat semper lacus auctor mattis. Etiam et erat
          ornare, viverra ligula quis, lacinia ex. Donec a diam rutrum,
          dignissim leo vel, fringilla lectus. Vivamus dui diam, feugiat sed
          nibh nec, ornare ultricies nibh. Quisque congue leo quam, ut faucibus
          risus feugiat id. Curabitur tristique porta tortor, auctor condimentum
          ex condimentum ut. Phasellus posuere mi vel ipsum accumsan, cursus
          consequat nibh faucibus. Pellentesque vitae elit in lacus posuere
          bibendum ornare a enim. Nunc sed massa sapien. Mauris dapibus ipsum
          finibus arcu hendrerit aliquet id at felis. Donec mattis diam quis
          arcu finibus facilisis. Curabitur sed mi congue, tempor ipsum sed,
          pulvinar turpis. Donec eget eros eu libero sagittis tempus tempus sed
          magna.
        </p>
      </div>
    </div>
  );
}

module.exports = RefTest;
