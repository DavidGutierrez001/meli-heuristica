"use client";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Image, House, Send, Bell, CircleHelp, ShoppingCart, RotateCcw, FileText, Trash, Popcorn, SearchIcon, ArrowRight, ChevronRight, Sparkles } from "lucide-react"
import { MorphIcon } from "morphicons/react";
import { Sparkles as SparklesData, Send as SendData } from "lucide";
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Separator } from "@/components/ui/separator";
import { gsap } from "gsap";
import { Kbd } from "@/components/ui/kbd"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function H01() {
    const [isSearching, setIsSearching] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [focusInput, setFocusInput] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true);

    useEffect(() => {
        if (!isSearching) return;

        setIsSearched(false);
        setIsHomePage(false);

        const tl = gsap.timeline();

        tl.fromTo(".barloader",
            { width: "0%", borderRadius: 4 },
            { width: "100%", duration: 1.5, ease: "power2.inOut" }
        )
            .to(".barloader", {
                opacity: 0

            })
            .call(() => {
                gsap.set(".barloader", {
                    width: "0%",
                    opacity: 1
                });
                setIsSearching(false);
                setIsSearched(true);
            }, null, "-=0.5");

        return () => tl.kill();
    }, [isSearching]);

    useLayoutEffect(() => {
        if (!isSearched) return;

        gsap.fromTo(".target-product",
            { opacity: 0 },
            { opacity: 1, duration: 0.7, stagger: 0.05, ease: "power2.out" }
        );
    }, [isSearched]);


    return (
        <div className="flex flex-col justify-center items-center h-150 w-full shadow rounded-xl overflow-hidden">
            <div className="bg-[#ffe900] w-full h-20 justify-center items-center flex flex-col rounded-t-2xl">
                <div className="flex flex-col relative">
                    <form
                        className="w-100"
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            setIsSearching(true);
                        }}>

                        <Field>
                            <ButtonGroup className={`${isSearching ? "opacity-80 pointer-events-none" : "opacity-100"}`}>
                                <Input className="h-10 rounded bg-background border-0"
                                    id="input-button-group"
                                    placeholder="Buscar productos, marcas y más..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onFocus={() => setFocusInput(true)}
                                    onBlur={() => setFocusInput(false)}
                                />
                                <Button
                                    className="h-10 rounded bg-background"
                                    variant="ghost"
                                    type="submit"
                                    onClick={() => {
                                        setIsSearching(true);

                                    }}
                                >
                                    {isSearching ? <Spinner /> : <Search />}
                                </Button>
                            </ButtonGroup>
                        </Field>
                    </form>

                    <div className={`absolute top-full bg-white h-50 w-100 z-100 transition-all opacity-0 rounded-b shadow -translate-y-10 ${focusInput ? "opacity-100 translate-y-0" : "pointer-events-none"}`}>

                    </div>
                </div>
            </div>

            <div className="w-full h-full p-5 flex gap-5 relative overflow-hidden bg-[#fdfdfd">
                <div className={`barloader absolute h-2 bg-[#0258a7] left-0 top-0`}></div>

                <div className="bg-[#f6f6f6] h-full w-40 rounded flex flex-col p-3 gap-5 items-center" />
                <div className="w-full bg-[#f6f6f6] rounded">
                    {isHomePage ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="min-h-40 bg-zinc-200 w-full" />

                            <div className="grid grid-cols-3 grid-rows-1 h-full w-full gap-5 p-5">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={`home-skeleton-${index}`} className="bg-zinc-200 w-full h-full" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 grid-rows-2 gap-5 h-full w-full rounded p-5">
                            {isSearching && Array.from({ length: 8 }).map((_, index) => (
                                <div key={`skeleton-${index}`} className="w-full h-full">
                                    <Skeleton className="h-full w-full rounded bg-zinc-200" />
                                </div>
                            ))}

                            {isSearched && Array.from({ length: 8 }).map((_, index) => (
                                <div key={`result-${index}`} className="target-product w-full h-full rounded">
                                    <div className="h-full w-full flex flex-col justify-center items-center p-1 bg-white">
                                        <div className="flex-2 h-full w-full bg-[#f5f5f5] justify-center items-center flex">
                                            <Image size={30} strokeWidth={1} className="text-zinc-300" />
                                        </div>
                                        <div className="bg-white w-full h-full flex-1 text-[.5rem] p-2 items-start justify-between flex flex-col gap-2">
                                            <div className="flex flex-col w-full gap-2">
                                                <span className="w-full h-2 rounded-full bg-zinc-300" />
                                                <span className="w-1/2 h-2 rounded-full bg-zinc-300" />
                                            </div>
                                            <div className="flex w-full gap-2">
                                                <span className="bg-zinc-300 w-1/2 h-3 rounded-full"></span>
                                                <span className="bg-zinc-400 w-20 h-3 rounded-full"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export function H02() {
    const items = [
        { id: 1, name: "Resumen", icon: <House size={27} strokeWidth={1.7} />, description: "Muestra un resumen de las actividades del vendedor." },
        { id: 2, name: "Publicar", icon: <Send size={27} strokeWidth={1.7} />, description: "Permite publicar nuevos productos." },
        { id: 3, name: "Novedades", icon: <Bell size={27} strokeWidth={1.7} />, description: "Muestra las últimas novedades del sistema." },
        { id: 4, name: "Preguntas", icon: <CircleHelp size={27} strokeWidth={1.7} />, description: "Muestra las preguntas frecuentes del sistema." },
        { id: 5, name: "Ventas", icon: <ShoppingCart size={27} strokeWidth={1.7} />, description: "Muestra el historial de ventas del vendedor." },
        { id: 6, name: "Posventa", icon: <RotateCcw size={27} strokeWidth={1.7} />, description: "Muestra la información sobre posventa." },
        { id: 7, name: "Publicaciones", icon: <FileText size={27} strokeWidth={1.7} />, description: "Permite generar informes sobre las actividades del vendedor." },
    ];

    return (
        <div className="flex flex-col bg-[#fdfdfd] h-full w-full rounded-xl overflow-hidden shadow">
            <div className="bg-white flex flex-col h-full w-1/2 p-2 border-r">
                {items.map((item) => (
                    <Tooltip key={item.id}>
                        <TooltipTrigger>
                            <div key={item.id} className="flex p-4 items-center justify-start hover:bg-[#fafafa] cursor-pointer rounded-md gap-6">
                                <span className="flex">{item.icon}</span>
                                <span className="text-[#33333] text-lg tracking-tight">{item.name}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="min-h-13 border">
                            <p className="text-base">{item.description}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}

export function H03() {
    return (
        <div className="flex flex-col">
            {Array.from({ length: 3 }).map((_, index) => (
                <CardItem key={index} />
            ))}
        </div>
    );

    function CardItem() {
        const cardRef = useRef(null);
        const originalClassRef = useRef("");
        const originalContentRef = useRef("");

        // 1. Añade esto arriba en tu componente (junto a tus otros useRef)
        const closeCardTimeoutRef = useRef(null);

        function deleteCard() {
            const card = cardRef.current;
            if (!card) return;

            // Guardar el estado original ANTES de modificar nada
            originalClassRef.current = card.className;
            originalContentRef.current = card.innerHTML;

            gsap.to(card, {
                height: 60,
                paddingTop: 0,
                paddingBottom: 0,
                overflow: "hidden",
                borderWidth: 0,
                backgroundColor: "#3483fa",
                color: "#3483fa",
                ease: "power4.inOut",
            });

            gsap.to(card.querySelectorAll("*"), {
                opacity: 0,
                duration: 0.3, // Duración corta para que sea fluido
                ease: "power4.inOut",
                onComplete: () => {
                    if (!cardRef.current) return;

                    // Esto se ejecuta JUSTO cuando los elementos llegan a opacidad 0
                    card.className = "flex rounded-md overflow-hidden relative mb-3";
                    card.innerHTML = `
                <div class="relative flex items-center justify-between h-full w-full text-white px-5">
                    <span class="font-light flex items-center gap-2">
                        Producto eliminado
                    </span>
                    <button id="btn-undo" class="font-light bg-black/5 hover:bg-black/20 px-2 py-1 flex gap-2 items-center rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="lucide lucide-undo-2 preview-icon" viewBox="0 0 24 24"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                        Deshacer
                    </button>
                </div>
                `;

                    // Asignar el listener al botón recién creado
                    const btnUndo = card.querySelector("#btn-undo");
                    if (btnUndo) {
                        btnUndo.addEventListener("click", () => {
                            if (closeCardTimeoutRef.current) {
                                clearTimeout(closeCardTimeoutRef.current);
                            }
                            undoDelete();
                        });
                    }
                }
            });

            // Animación de la barra de carga amarilla
            setTimeout(() => {
                if (!cardRef.current) return;

                const load = document.createElement('span');
                load.className = "absolute top-0 left-0 bg-yellow-300";
                cardRef.current.appendChild(load);

                gsap.fromTo(load, {
                    width: "100%",
                    height: 4,
                    opacity: 0,
                    onComplete: () => {
                        gsap.to(load, {
                            opacity: 1,
                        })
                    }
                }, {
                    width: "0%",
                    duration: 4.5,
                    ease: "none",
                });
            }, 500);

            // 3. Guardamos el timeout en el Ref para que pueda ser cancelado desde afuera
            closeCardTimeoutRef.current = setTimeout(() => {
                if (!cardRef.current) return;

                gsap.to(card, {
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    margin: 0,
                    opacity: 0,
                    ease: "power4.inOut",
                });
            }, 5000);

            // *Nota: Eliminamos el document.addEventListener de aquí abajo porque causaba fugas de memoria.*
        }

        function undoDelete() {
            const card = cardRef.current;

            // Limpiar todo lo que dejó GSAP
            gsap.killTweensOf(card);
            gsap.set(card, { clearProps: "all" });

            card.className = originalClassRef.current;
            card.innerHTML = originalContentRef.current;

            // Los hijos restaurados traen opacity 0 inline; se limpian
            gsap.set(card.querySelectorAll("*"), { clearProps: "all" });

            // El HTML restaurado perdió el onClick de React, así que lo reasignamos
            card.querySelector("[data-delete]").addEventListener("click", deleteCard);

            gsap.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.3 });


        }

        return (
            <div className="relative">
                <div
                    ref={cardRef}
                    className="grid grid-cols-[130px_1fr_100px] w-full p-3 gap-3 border rounded-md bg-white relative mb-3"
                >
                    <div className="flex flex-col h-full text-zinc-300 w-full bg-zinc-100 rounded-md items-center justify-center">
                        <Image size={50} strokeWidth={1} />
                    </div>
                    <div>
                        <div className="flex flex-col gap-3 justify-center h-full items-start">
                            <span className="bg-[#c8deff88] w-40 h-5 rounded-full"></span>
                            <span className="bg-zinc-100 w-70 h-3 rounded-full"></span>
                            <span className="bg-[#96c0ff46] w-33 h-3 rounded-full"></span>
                            <div className="flex gap-2 items-center">
                                <span className="bg-zinc-200 opacity-40 w-30 h-7 rounded-full flex items-center justify-around text-zinc-400">
                                    <span>-</span>
                                    <span>0</span>
                                    <span>+</span>
                                </span>
                                <button
                                    data-delete
                                    className="rounded-full w-20 h-7 bg-red-100 text-red-500 hover:bg-red-200 flex items-center justify-center transition-colors"
                                    onClick={deleteCard}
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2 h-full">
                        <div className="flex gap-1 items-center">
                            <span className="bg-zinc-200 w-20 h-4 rounded-full"></span>
                            <span className="bg-[#00a65038] w-15 h-4 rounded-full"></span>
                        </div>
                        <span className="bg-zinc-300 w-full h-5 rounded-full"></span>
                    </div>
                </div>
            </div>
        );
    }
}


export function H04() {
    return (
        <div className="flex flex-col text-start gap-5 p-5">
            <h1>Un solo icono permite al usuario persistir la consitencia de todas las plataformas de Mercado Libre y no confundirse</h1>
            <div className="border grid grid-cols-[100px_1fr_150px] w-full h-20 items-center text-center rounded-full text-[#333333] cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                <div className="flex h-full w-full items-center justify-center">
                    <Popcorn size={30} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-medium text-start tracking-tight">Mercado Play</span>
                <div className="flex h-full w-full items-center justify-center">
                    <span className="w-[calc(100%-2rem)] py-1 rounded-full text-white bg-[#01a74a] uppercase">gratis</span>
                </div>
            </div>
        </div>
    )
}


export function H07() {
    const [openSearch, setOpenSearch] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const el = document.activeElement;
            const escribiendo =
                ["INPUT", "TEXTAREA"].includes(el.tagName) || el.isContentEditable;

            if (e.key === "/" && !escribiendo) {
                e.preventDefault();
                setOpenSearch(true);
            }

            if (e.key === "Escape") {
                setOpenSearch(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Animación de entrada, cuando el modal ya está en el DOM
    useEffect(() => {
        if (openSearch) {
            gsap.fromTo(
                ".search-modal",
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.2 }
            );
        }
    }, [openSearch]);

    const items = [
        { id: 1, name: "Categorías" },
        { id: 2, name: "Ofertas" },
        { id: 3, name: "Cupones" },
        { id: 4, name: "Supermercado" },
        { id: 5, name: "Moda" },
        { id: 6, name: "Vender" },
        { id: 7, name: "Ayuda / PQR" },
    ];

    const [query, setQuery] = useState("");

    const filtrados = items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );


    return (
        <div className="w-full grid grid-cols-2 gap-5 h-120 place-content-center justify-items-center">
            <div className="flex flex-col items-center justify-center">
                <span className="max-w-80 bg-white p-3 rounded-xl shadow h-fit">
                    Presiona la tecla <Kbd className="shadow">/</Kbd> para acceder a la búsqueda rápida de productos y publicaciones.
                </span>
            </div>

            {openSearch && (
                <div
                    className="search-modal bg-white rounded-xl h-full w-80 outline-4 outline-zinc-200 shadow-2xl p-3 flex flex-col gap-1 opacity-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <InputGroup>
                        <InputGroupInput
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar en la página"
                            autoFocus
                        />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                    <Label htmlFor="search-input" className="text-xs tracking-tight ms-2 text-zinc-400 mt-3">Páginas</Label>
                    <div className="flex flex-col w-full">
                        {filtrados.length > 0 ? (
                            filtrados.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 items-center text-sm rounded hover:bg-gray-100 p-2 cursor-pointer hover:border-zinc-200 border border-transparent"
                                >
                                    <ArrowRight size={15} />
                                    {item.name}
                                </div>
                            ))
                        ) : (
                            <p className="p-2 text-sm text-gray-500">No hay resultados</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export function H10() {

    const items = [
        { id: 1, name: "Compras" }, { id: 2, name: "Configuración de mi cuenta" }, { id: 3, name: "Ventas" }, { id: 4, name: "Seguridad y acceso a la cuenta" }, { id: 5, name: "Mi cuenta" }
    ]

    const [openChatBot, setOpenChatBot] = useState(false);
    const btnRef = useRef(null);

    const toggleChatBot = () => {

        gsap.to(btnRef.current, {
            "--tw-gradient-from": "rgba(114,168,255,0)",
            "--tw-gradient-to": "rgba(45,50,119,0)",
            color: "#888888",
            duration: 0.4,
            width: "100%",
            ease: "power2.inOut",
            justifyContent: "space-between",

            onComplete: () => {
                setOpenChatBot(next);
            }
        });
    };



    return (
        <div className="flex flex-col items-center max-h-110">
            <div className="flex flex-col bg-white max-w-150 w-full p-5 rounded-2xl gap-5 shadow-md">
                <h1 className="text-2xl font-medium text-center">¿Con qué te ayudamos?</h1>
                <Separator />
                <div className="flex flex-col w-full justify-center items-center overflow-hidden gap-2">
                    {openChatBot ? (
                        <>
                            <div className="flex flex-col relative border outline-none rounded-full h-11 w-full whitespace-nowrap gap-3 items-center justify-center text-sm">
                                <input type="text" placeholder="Preguntarle a la IA" className="h-full w-full px-5 outline-none border-none text-black" />
                                <MorphIcon className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer h-full" size={20} strokeWidth={1.5} icon={openChatBot ? SendData : SparklesData} />
                            </div>
                        </>) : (
                        <>
                            <div
                                ref={btnRef}
                                aria-expanded={openChatBot}
                                className="bg-linear-to-tr from-[#72a8ff] to-[#2d3277] text-white h-11 rounded-full px-5 w-fit text-start whitespace-nowrap flex gap-3 items-center cursor-pointer text-sm"
                                onClick={toggleChatBot}
                            >
                                Preguntarle a la IA
                                <MorphIcon size={20} strokeWidth={1.5} icon={openChatBot ? SendData : SparklesData} />
                            </div>
                        </>
                    )}
                </div>
                <Separator />
                <div className="flex flex-col gap-5">
                    <h2 className="ms-2">Explora las preguntas frecuentes</h2>
                    <div>
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between gap-3 items-center text-sm rounded hover:bg-gray-100 p-2 cursor-pointer hover:border-zinc-200 border border-transparent">
                                {item.name}
                                <ChevronRight size={15} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}