const counterUp = () => {
    class countUp {
      constructor(el) {
        this.el = el;
        this.setVars();
        this.init();
      }
  
      setVars() {
        this.number = this.el.querySelectorAll("[data-countup-number]");
        this.observerOptions = {
          root: null,
          rootMargin: "0px 0px",
          threshold: 0,
        };
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const end = parseFloat(
              entry.target.dataset.countupNumber.replace(/,/g, "")
            );
            const decimals = this.countDecimals(end);
            if (entry.isIntersecting) {
              this.iterateValue(entry.target, end, decimals);
            }
          });
        }, this.observerOptions);
      }
  
      init() {
        if (this.number.length > 0) {
          this.number.forEach((el) => {
            this.observer.observe(el);
          });
        }
      }
  
      iterateValue(el, end, decimals) {
        const start = 0;
        const duration = 2500;
        let startTimestamp = null;
  
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const elapsedPercent = (timestamp - startTimestamp) / duration;
          const easedProgress = Math.min(this.easeOutQuint(elapsedPercent), 1);
          let interimNumber = Math.abs(easedProgress * (end - start) + start);
          el.innerHTML = this.formatNumber(interimNumber, decimals);
          if (easedProgress < 1) {
            window?.requestAnimationFrame(step);
          }
        };
  
        // requestAnimationFrame returns DOMHighResTimeStamp as a callback (used as timestamp)
        window?.requestAnimationFrame(step);
      }
  
      easeOutQuad(x) {
        return 1 - Math.pow(1 - x, 3);
      }
  
      easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
      }
  
      countDecimals(val) {
        if (typeof val !== "number" || isNaN(val)) return 0; // Ensure val is a valid number
        if (Math.floor(val) === val) return 0; // If val is an integer, return 0
        return val.toString().includes(".") ? val.toString().split(".")[1]?.length || 0 : 0;
      }
      
  
      formatNumber(val, decimals) {
        return val.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      }
    }
  
    // Simplifed version of Viget dynamic modules to attach instances for this demo
    // https://www.viget.com/articles/how-does-viget-javascript/
    // You CAN use this pattern, but it's single purpose right now
    const dataModules = document.querySelectorAll('[data-module="countup"]');
  
    dataModules.forEach((element) => {
      element.dataset.module.split(" ").forEach(function () {
        new countUp(element);
      });
    });
  
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      new countUp(counter);
    });
  };
  export default counterUp;
  