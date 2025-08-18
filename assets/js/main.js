// Set current year in footer
(function () {
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();

// Smooth scroll for anchor links
document.addEventListener('click', function(e){
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href').slice(1);
  if(!id) return;
  const el = document.getElementById(id);
  if(!el) return;
  e.preventDefault();
  el.scrollIntoView({behavior:'smooth', block:'start'});
});

// Terminal Typing Animation
document.addEventListener('DOMContentLoaded', function(){
  const output = document.getElementById('typing-output');
  if (!output) return;

  const skills = [
    { category: "Frontend Development:", items: ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap"] },
    { category: "Backend Development:", items: ["Java", "Spring Boot", "Node.js", "Express.js"] },
    { category: "Database & APIs:", items: ["SQL", "REST APIs", "JPA/Hibernate"] },
    { category: "Tools & Version Control:", items: ["Git", "GitHub", "Maven"] },
    { category: "Emerging Technologies:", items: ["AI/ML (Basics)", "Data Engineering", "Cloud Computing"] },
    { category: "Current Focus:", items: ["Spring Security", "Microservices", "Full-Stack Projects"] }
  ];

  let currentCategory = 0;
  let currentItem = 0;
  let isTypingCategory = true;
  let charIndex = 0;
  let currentLine = null;

  function createNewLine() {
    const line = document.createElement('div');
    line.className = 'typed-line';
    output.appendChild(line);
    return line;
  }

  function typeText(element, text, callback, isCategory = false) {
    const className = isCategory ? 'skill-category' : 'skill-item';
    element.innerHTML = `<span class="${className}"></span>`;
    const span = element.querySelector('span');
    
    let i = 0;
    const typingSpeed = isCategory ? 80 : 60;
    
    function typeChar() {
      if (i < text.length) {
        span.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, typingSpeed + Math.random() * 40);
      } else {
        setTimeout(callback, 500);
      }
    }
    typeChar();
  }

  function startTyping() {
    // Clear initial loading text
    output.innerHTML = '';
    
    function typeNextItem() {
      if (currentCategory >= skills.length) {
        // Typing complete, add final prompt
        setTimeout(() => {
          const finalLine = createNewLine();
          finalLine.innerHTML = '<span class="skill-category">✓ Skills loaded successfully!</span>';
        }, 800);
        return;
      }

      const skill = skills[currentCategory];
      
      if (isTypingCategory) {
        // Type category name
        currentLine = createNewLine();
        typeText(currentLine, skill.category, () => {
          isTypingCategory = false;
          currentItem = 0;
          setTimeout(typeNextItem, 200);
        }, true);
      } else {
        // Type skill items
        if (currentItem < skill.items.length) {
          currentLine = createNewLine();
          typeText(currentLine, `  • ${skill.items[currentItem]}`, () => {
            currentItem++;
            setTimeout(typeNextItem, 300);
          });
        } else {
          // Move to next category
          currentCategory++;
          isTypingCategory = true;
          // Add spacing between categories
          const spaceLine = createNewLine();
          spaceLine.innerHTML = '';
          setTimeout(typeNextItem, 400);
        }
      }
    }

    // Start typing after a short delay
    setTimeout(typeNextItem, 1000);
  }

  // Start the typing animation
  startTyping();

  // Optional: Restart animation on scroll or click
  const terminal = document.querySelector('.terminal');
  if (terminal) {
    terminal.addEventListener('click', () => {
      currentCategory = 0;
      currentItem = 0;
      isTypingCategory = true;
      startTyping();
    });
  }
});

// Simple fade-in animation for cards
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.1});

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.card').forEach(el=>{
    observer.observe(el);
  });
});
