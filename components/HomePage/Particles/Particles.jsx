import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function ParticlesContainer({
  opacity = 0.5,
  color = '#ffffff',
}) {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async engine => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = container => {};

  const options = useMemo(
    () => ({
      //   background: {
      //     color: {
      //       value: '#000000',
      //     },
      //   },
      particles: {
        number: {
          value: 10,
        },
        color: {
          value: '#FF4500', // Orange-red color for the leaves
        },
        shape: {
          type: 'image',
          options: {
            image: [
              {
                src: '/leaf.png', // Maple leaf image
                width: 100,
                height: 100,
                replaceColor: true,
              },
            ],
          },
        },
        opacity: {
          value: 0.8,
          random: true,
        },
        size: {
          value: 20,
          random: true,
        },
        move: {
          direction: 'bottom',
          enable: true,
          speed: 2,
          outModes: {
            default: 'out',
          },
        },
        rotate: {
          value: 180,
          random: true,
          animation: {
            enable: true,
            speed: 10,
            sync: false,
          },
        },
      },
      //   interactivity: {
      //     events: {
      //       onHover: {
      //         enable: true,
      //         mode: 'repulse',
      //       },
      //       onClick: {
      //         enable: true,
      //         mode: 'push',
      //       },
      //     },
      //   },
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
}
