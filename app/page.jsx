"use client";
import { H01, H02, H03, H04, H07, H10 } from "./hallazgo/page.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Modal from "@/components/modal";
import Image from "next/image";
import { ChevronDown } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    // 1. Conectar GSAP ticker con Lenis para que procese el scroll
    const updateLenis = (timer) => {
      lenis.raf(timer * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const contents = document.querySelectorAll(".content");

    contents.forEach((section) => {
      gsap.fromTo(section, {
        opacity: 0,
        scale: 0.8,
      }, {
        opacity: 1,
        duration: .8,
        scale: 1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: section,
          start: "center 180%",
          end: "top center",
          toggleActions: "play none none reverse",
          markers: true, // Quítalo cuando termines de probar
        },
      });
    });

    // 2. Función de limpieza (Cleanup) muy importante en React
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy(); ``
      gsap.ticker.remove(updateLenis); ``
    };
  }, []);


  const [saveMedia, setSaveMedia] = useState("");


  const infoproblems = [
    {
      id: 1,
      hallazgo: "H01",
      tieneHallazgo: true,
      title: "Visibilidad del estado del sistema",
      description: "Al aplicar filtros y ordenamientos en los resultados de búsqueda, la interfaz no muestra un indicador de progreso ni actualiza con claridad los filtros activos, de modo que el usuario no sabe si su solicitud fue procesada o si la página continúa cargando.",
      modulo: "Búsqueda y navegación",
      severidad: "Moderado",
      problemMedia: "video",
      solucion: <H01 />,
    },
    {
      id: 2,
      hallazgo: "H02",
      tieneHallazgo: true,
      title: "Correspondencia entre el sistema y el mundo real",
      description: "En el panel de vendedor, etiquetas como 'publicación', 'reputación' o 'Mercado Envíos' se presentan sin una explicación contextual, y algunos términos pueden resultar ambiguos según el país del usuario, obligándolo a interpretar la terminología en lugar de reconocerla.",
      modulo: "Cuenta de usuario y postventa",
      severidad: "Leve",
      problemMedia: "video",
      solucion: <H02 />,
    },
    {
      id: 3,
      hallazgo: "H03",
      tieneHallazgo: true,
      title: "Control y libertad del usuario",
      description: "Acciones como eliminar un producto del carrito o dar de baja una publicación no ofrecen un mecanismo claro de deshacer ni una confirmación previa, por lo que un clic accidental no puede revertirse con facilidad.",
      modulo: "Gestión del carrito",
      severidad: "Moderado",
      problemMedia: "video",
      solucion: <H03 />,
    },
    {
      id: 4,
      hallazgo: "H04",
      tieneHallazgo: true,
      title: "Consistencia y estándares",
      description: "Algunos iconos y etiquetas cambian de forma o de posición entre la versión web y la aplicación móvil (por ejemplo, el acceso al carrito o a favoritos), lo que rompe la coherencia y obliga al usuario a reaprender la ubicación de las funciones en cada entorno.",
      modulo: "Interfaz general (web y aplicación)",
      severidad: "Leve",
      problemMedia: "image",
      solucion: <H04 />,
    },
    {
      id: 5,
      hallazgo: "H05",
      tieneHallazgo: false,
      title: "Prevención de errores",
      description: "No se identificaron hallazgos adicionales. Se revisaron los flujos de carrito, checkout, publicación, variantes, búsqueda y calificaciones, y la plataforma incluye validaciones, confirmaciones y mensajes preventivos adecuados.",
      modulo: "Checkout",
      severidad: null,
      problemMedia: null,
      solucion: null,
    },
    {
      id: 6,
      hallazgo: "H06",
      tieneHallazgo: false,
      title: "Reconocimiento antes que recuerdo",
      description: "No se identificaron hallazgos adicionales. La barra de navegación es sólida, incluye sugerencias de autocompletado y filtros.",
      modulo: null,
      severidad: null,
      problemMedia: null,
      solucion: null,
    },
    {
      id: 7,
      hallazgo: "H07",
      tieneHallazgo: true,
      title: "Flexibilidad y eficiencia de uso",
      description: "En el panel de vendedor y en la gestión de publicaciones para versión de escritorio no se encontraron atajos de teclado ni acciones rápidas para tareas repetitivas, por lo que los usuarios frecuentes deben recorrer los mismos pasos cada vez.",
      modulo: "Cuenta de usuario y postventa",
      severidad: "Leve",
      problemMedia: "image",
      solucion: <H07 />,
    },
    {
      id: 8,
      hallazgo: "H08",
      tieneHallazgo: false,
      title: "Diseño estético y minimalista",
      description: "No se encontró vulnerabilidades adicionales. La interfaz es limpia, con jerarquía visual clara y sin elementos innecesarios.",
      modulo: "Catálogo de productos",
      severidad: null,
      problemMedia: null,
      solucion: null,
    },
    {
      id: 9,
      hallazgo: "H09",
      tieneHallazgo: false,
      title: "Reconocer, diagnosticar y recuperarse de errores",
      description: "No se identificaron hallazgos adicionales. Los mensajes de error son claros, con instrucciones para la recuperación y enlaces a ayuda.",
      modulo: "Checkout",
      severidad: "Moderado",
      problemMedia: "image",
      solucion: null,
    },
    {
      id: 10,
      hallazgo: "H10",
      tieneHallazgo: true,
      title: "Ayuda y documentación",
      description: "El centro de ayuda es parcialmente incompleto: no incluye una barra de búsqueda ni la opción de hacer preguntas a la IA.",
      modulo: "Cuenta de usuario y postventa",
      severidad: "Leve",
      problemMedia: "image",
      solucion: <H10 />,
    },
  ];

  const frontRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frontRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: frontRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
            markers: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);



  return (
    <div className="flex flex-col items-center justify-center pb-20 pt-20 pe-20 ps-35 w-full max-w-350 bg-background">
      <Modal saveMedia={saveMedia} onClose={() => setSaveMedia(null)} />

      <div className="w-full h-full flex flex-col gap-20">
        <div ref={frontRef} className="h-[calc(100svh-10rem)] flex flex-col items-center justify-center gap-10 relative">
          <div className="flex flex-col items-center gap-10">
            <h1 className="text-6xl font-semibold tracking-tighter text-black/80">Heurística vulnerada en</h1>
            <Image src="/logoml.svg" alt="Logo" width={500} height={100} />
          </div>
          <div className="text-2xl text-center font-medium tracking-tighter gap-2 flex flex-col absolute right-0 bottom-0">
            <span className="text-xl text-[#333333]">Presentado por:</span>
            <h2>Jose David Nuñez Gutierrez</h2>
            <h2>John Alexander Peña Bedoya</h2>
          </div>
          <span className="h-15 w-15 rounded-full bg-amber-300 absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center animate-bounce text-[#2d3277] shadow-xl">
            <ChevronDown size={40} />
          </span>
        </div>
        <main className="flex flex-col gap-10 relative">
          {infoproblems.map((problem) => (
            <div className="relative" key={problem.id}>
              <div className="sticky tracking-tighter text-end -translate-x-[calc(100%+2rem)] text-3xl font-semibold top-1/2 bg-[#ffe900] flex items-center justify-center h-18 w-18 rounded-md">
                {problem.hallazgo}
              </div>

              {problem.tieneHallazgo ? (
                <div className="grid grid-cols-7 grid-rows-[auto_auto_auto] w-full h-auto gap-5 rounded-xl">
                  <section className="col-start-1 col-span-3 row-start-1 flex flex-col items-center justify-center gap-5">
                    <h2 className="font-semibold text-4xl text-[#333333] text-start leading-none">{problem.title}</h2>
                    <p className="text-lg">{problem.description}</p>
                  </section>

                  <section className="col-start-4 col-span-4 row-start-1 w-full h-full flex flex-col items-center justify-center rounded-xl">
                    <div className="flex flex-col justify-center items-center cursor-pointer hover:shadow-xl transition-all">
                      {problem.problemMedia === "video" ? (
                        <video
                          className="media-video w-full rounded-xl shadow-md object-cover object-top"
                          src={`/videos/${problem.hallazgo}.mp4`}
                          autoPlay
                          loop
                          muted
                          onClick={() => setSaveMedia({ hallazgo: problem.hallazgo, type: "video" })}
                        />
                      ) : (
                        <img
                          className="media-image w-full rounded-xl shadow-md"
                          src={`/${problem.hallazgo}.svg`}
                          alt={`Problema heurístico ${problem.hallazgo}`}
                          onClick={() => setSaveMedia({ hallazgo: problem.hallazgo, type: "image" })}
                        />
                      )}
                    </div>
                  </section>

                  <header className="col-start-1 col-span-7 row-start-3 row-span-1 flex items-center justify-center">
                    <h2 className="text-2xl font-semibold text-[#333333]">Propuesta heurística</h2>
                  </header>
                  <section className="col-start-1 row-start-4 col-span-7 p-10 bg-[#fafafa] inset-shadow-sm rounded">
                    {problem.solucion}
                  </section>
                </div>
              ) : (
                <>
                  <div className="border min-h-50 p-5 flex flex-col items-center justify-center text-center">
                    <h2 className="font-semibold text-2xl text-[#333333]">{problem.title}</h2>
                    <p className="text-lg max-w-200">{problem.description}</p>
                  </div>
                </>
              )}
            </div>
          ))
          }
        </main >
      </div >
    </div >
  );
}
