import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-[#60a5fa]" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
          Fullstack -
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#3b82f6]/20 to-[#06b6d4]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Software Developer", "Geospatial Enthusiast"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/martinezmoises" },
  { icon: Mail, link: "mailto:martinez.alemoi@gmail.com" },
  { icon: Instagram, link: "https://www.instagram.com/ale.m4rtinez?igsh=MTRvNXNwMXFyN294YQ%3D%3D&utm_source=qr" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2" 
        : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] " id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto  min-h-screen ">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#3b82f6] to-[#06b6d4] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                 Designing and developing innovative, user-centric websites and software applications that drive digital excellence.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

           {/* Right Column - Icon Orbit Animation (blue theme) */}
<div
  className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
  data-aos="fade-left"
  data-aos-delay="600"
>
  <div className="relative w-full opacity-90">
    {/* background glow (kept) */}
    <div
      className={`absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 to-[#06b6d4]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
        isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
      }`}
    />

    {/* orbit container */}
    <div
      className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${
        isHovering ? "scale-105" : "scale-100"
      }`}
    >
      <div className="mx-auto relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]">
        {/* center core */}
       {/* center: halo ring (no solid square) */}
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
  <div className="relative w-36 h-36">
    {/* soft glow */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#06b6d4]/20 blur-xl" />
    {/* ring outline */}
    <div className="absolute inset-0 rounded-full border border-[#3b82f6]/40 shadow-[0_0_40px_rgba(59,130,246,0.25)]" />
    {/* rotating sweep highlight */}
    <div
      className="absolute inset-0 rounded-full opacity-60 animate-[spin_8s_linear_infinite]"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0%, rgba(59,130,246,.6) 10%, transparent 20%)"
      }}
    />
  </div>
</div>


        {/* subtle inner ring */}
        <div className="absolute inset-6 rounded-full border border-[#3b82f6]/20" />

        {/* rotating ring */}
        <div
          className="absolute inset-0"
          style={{ animation: "spin 20s linear infinite", transformOrigin: "50% 50%" }}
        >
          {/* node template */}
          {/* Top */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            {/* </> icon */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M10 19l4-14" />
            </svg>
          </div>

          {/* Top-right */}
          <div className="absolute right-[8%] top-[16%] translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            {/* CPU icon */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <rect x="8" y="8" width="8" height="8" rx="1.5" />
              <path d="M3 10h2M3 14h2M19 10h2M19 14h2M10 3v2M14 3v2M10 19v2M14 19v2" />
            </svg>
          </div>

          {/* Right */}
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            {/* DB icon */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <ellipse cx="12" cy="6" rx="7" ry="3" />
              <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
            </svg>
          </div>

          {/* Bottom-right */}
          <div className="absolute right-[8%] bottom-[16%] translate-x-1/2 translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            {/* Terminal */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M4 5h16v14H4z" />
              <path d="M7 9l3 3-3 3M11 15h6" />
            </svg>
          </div>

          {/* Bottom */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            {/* Cloud */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M7 18h9a4 4 0 0 0 0-8 6 6 0 0 0-11 2" />
            </svg>
          </div>

          {/* Bottom-left */}
          <div className="absolute left-[8%] bottom-[16%] -translate-x-1/2 translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            {/* Shield */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M12 3l7 4v5c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V7l7-4z" />
            </svg>
          </div>

          {/* Left */}
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            {/* Boxes */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M3 7l9-4 9 4-9 4-9-4z" />
              <path d="M3 7v6l9 4 9-4V7" />
              <path d="M12 11v6" />
            </svg>
          </div>

          {/* Top-left */}
          <div className="absolute left-[8%] top-[16%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            {/* Globe */}
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* outer ambient pulse (kept) */}
    <div
      className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
        isHovering ? "opacity-50" : "opacity-20"
      }`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
          isHovering ? "scale-110" : "scale-100"
        }`}
      />
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);