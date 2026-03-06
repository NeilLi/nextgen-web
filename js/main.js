document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinksWrapper = document.querySelector(".nav-links-wrapper");
  const currentYearSpan = document.getElementById("currentYear");

  if (menuBtn && navLinksWrapper) {
    menuBtn.addEventListener("click", function () {
      const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!isExpanded));
      navLinksWrapper.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    navLinksWrapper.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (navLinksWrapper.classList.contains("active")) {
          menuBtn.setAttribute("aria-expanded", "false");
          navLinksWrapper.classList.remove("active");
          document.body.classList.remove("no-scroll");
        }
      });
    });
  }

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  const revealElements = document.querySelectorAll("[data-reveal]");

  try {
    revealElements.forEach(function (element) {
      element.classList.add("reveal-enter");
    });

    if ("IntersectionObserver" in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              entry.target.classList.remove("reveal-enter");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -40px 0px"
        }
      );

      revealElements.forEach(function (element) {
        revealObserver.observe(element);
      });
    } else {
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
        element.classList.remove("reveal-enter");
      });
    }
  } catch (error) {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
      element.classList.remove("reveal-enter");
    });
  }

  const layerTriggers = document.querySelectorAll("[data-layer-trigger]");
  const layerNodes = document.querySelectorAll(".engine-layer-node");
  const layerPanels = document.querySelectorAll(".engine-layer-panel");

  function setActiveLayer(layerId) {
    layerTriggers.forEach(function (trigger) {
      const isActive = trigger.dataset.layerTrigger === layerId;
      trigger.classList.toggle("is-active", isActive);
      trigger.setAttribute("aria-selected", String(isActive));
    });

    layerNodes.forEach(function (node) {
      node.classList.toggle("is-active", node.dataset.layer === layerId);
    });

    layerPanels.forEach(function (panel) {
      panel.classList.toggle("is-active", panel.dataset.layer === layerId);
    });
  }

  layerTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      setActiveLayer(trigger.dataset.layerTrigger);
    });

    trigger.addEventListener("mouseenter", function () {
      setActiveLayer(trigger.dataset.layerTrigger);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      const header = document.querySelector("header");
      const headerOffset = header ? header.offsetHeight + 24 : 0;
      const targetTop =
        targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    });
  });

  initDeveloperContracts();
  initMissionSimulation();

  function initDeveloperContracts() {
    const developerSection = document.getElementById("developers");

    if (!developerSection) {
      return;
    }

    const contractTabs = developerSection.querySelectorAll("[data-contract-tab]");
    const contractPanels = developerSection.querySelectorAll("[data-contract-panel]");

    if (!contractTabs.length || !contractPanels.length) {
      return;
    }

    function setActiveContract(tabName) {
      contractTabs.forEach(function (tab) {
        const isActive = tab.dataset.contractTab === tabName;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      contractPanels.forEach(function (panel) {
        const isActive = panel.dataset.contractPanel === tabName;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    }

    contractTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveContract(tab.dataset.contractTab);
      });
    });

    setActiveContract("chat");
  }

  function initMissionSimulation() {
    const missionSection = document.getElementById("mission-simulation");

    if (!missionSection) {
      return;
    }

    const stepElements = missionSection.querySelectorAll(".engine-sim-step");
    const stepButtons = missionSection.querySelectorAll(".engine-sim-step-btn");
    const progressFill = missionSection.querySelector("#missionProgress");
    const insightElement = missionSection.querySelector("#missionInsight");
    const stateElement = missionSection.querySelector("#missionState");
    const runtimeEventElement = missionSection.querySelector("#missionRuntimeEvent");
    const robotElement = missionSection.querySelector("#missionRobot");
    const apiRouteElement = missionSection.querySelector("#missionApiRoute");
    const apiCodeElement = missionSection.querySelector("#missionApiCode");
    const simNodes = missionSection.querySelectorAll(".engine-sim-node");
    const simLinks = missionSection.querySelectorAll(".engine-sim-links line");
    const viewButtons = missionSection.querySelectorAll("[data-sim-view]");
    const viewPanels = missionSection.querySelectorAll("[data-sim-view-panel]");

    if (!stepElements.length) {
      return;
    }

    const missionSteps = [
      {
        stateLabel: "Planning",
        stateKind: "planning",
        runtimeEvent: "Intent received. Building execution graph.",
        insight: "Intent converted into a task graph with policy constraints.",
        activeNodes: ["runtime", "operator", "pms"],
        activeLinks: ["operator", "pms"],
        alertNodes: [],
        alertLinks: [],
        robot: { x: "14%", y: "18%" },
        robotBlocked: false,
        apiRoute: "POST /runtime/execute",
        apiPayload: {
          intent: "Prepare conference room for meeting",
          location: "Hotel Tower A",
          deadline: "18:00",
          constraints: ["guest-safe", "low-noise"]
        }
      },
      {
        stateLabel: "Planning",
        stateKind: "planning",
        runtimeEvent: "AI reasoning decomposed mission into executable tasks.",
        insight: "Planning engine decomposes intent into sequencing, dependencies, and fallback paths.",
        activeNodes: ["runtime", "pms", "operator"],
        activeLinks: ["pms", "operator"],
        alertNodes: [],
        alertLinks: [],
        robot: { x: "22%", y: "24%" },
        robotBlocked: false,
        apiRoute: "POST /runtime/plan",
        apiPayload: {
          goal: "conference-room-ready",
          tasks: ["robot.clean", "hvac.adjust", "projector.power", "seating.verify"],
          dependencies: [["projector.power", "seating.verify"]]
        }
      },
      {
        stateLabel: "Policy Check",
        stateKind: "running",
        runtimeEvent: "Safety governance validated access, safety zones, and quiet-hours policy.",
        insight: "Policy governance is enforced before physical side effects are allowed.",
        activeNodes: ["runtime", "sensors", "operator", "pms"],
        activeLinks: ["sensors", "operator", "pms"],
        alertNodes: [],
        alertLinks: [],
        robot: { x: "28%", y: "40%" },
        robotBlocked: false,
        apiRoute: "POST /runtime/authorize",
        apiPayload: {
          policies: ["building-access", "robot-safety-zone", "quiet-hours"],
          result: "approved",
          mode: "deny-by-default"
        }
      },
      {
        stateLabel: "Executing",
        stateKind: "running",
        runtimeEvent: "Dispatching robot.clean, HVAC setpoint, projector power-on, and staff standby.",
        insight: "SeedCore orchestrates machines and operators through one runtime control plane.",
        activeNodes: ["runtime", "robot", "hvac", "projector", "lighting", "operator"],
        activeLinks: ["robot", "hvac", "projector", "lighting", "operator"],
        alertNodes: [],
        alertLinks: [],
        robot: { x: "56%", y: "56%" },
        robotBlocked: false,
        apiRoute: "POST /runtime/execute",
        apiPayload: {
          dispatch: ["robot.clean", "hvac.temperature.set", "projector.power.on"],
          operator: "standby-notified",
          observability: "live"
        }
      },
      {
        stateLabel: "Recovery",
        stateKind: "alert",
        runtimeEvent: "Robot blocked in hallway. Replanning triggered. Staff fallback dispatched.",
        insight: "Failure recovery preserves mission intent through replanning and human escalation.",
        activeNodes: ["runtime", "robot", "operator", "sensors"],
        activeLinks: ["robot", "operator", "sensors"],
        alertNodes: ["robot"],
        alertLinks: ["robot"],
        robot: { x: "36%", y: "24%" },
        robotBlocked: true,
        apiRoute: "POST /runtime/replan",
        apiPayload: {
          failure: "robot.blocked.hallway",
          replanning: true,
          fallback: "staff.dispatch",
          eta_minutes: 3
        }
      },
      {
        stateLabel: "Completed",
        stateKind: "success",
        runtimeEvent: "Mission complete. Conference room ready with HVAC, projector, and cleaning verified.",
        insight: "Observed completion state confirms reliability, not just automation attempts.",
        activeNodes: ["runtime", "hvac", "projector", "lighting", "operator", "pms"],
        activeLinks: ["hvac", "projector", "lighting", "operator", "pms"],
        alertNodes: [],
        alertLinks: [],
        robot: { x: "60%", y: "62%" },
        robotBlocked: false,
        apiRoute: "POST /runtime/complete",
        apiPayload: {
          status: "success",
          outcomes: ["room.cleaned", "hvac.optimized", "projector.online", "seating.verified"],
          audit_trace: "sealed"
        }
      }
    ];

    const stepDurationMs = 3000;
    let currentStepIndex = 0;
    let timerId = null;

    function setView(viewName) {
      viewButtons.forEach(function (button) {
        const isActive = button.dataset.simView === viewName;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
      });

      viewPanels.forEach(function (panel) {
        const isActive = panel.dataset.simViewPanel === viewName;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    }

    function renderStep(stepIndex) {
      const safeIndex = (stepIndex + missionSteps.length) % missionSteps.length;
      const step = missionSteps[safeIndex];
      currentStepIndex = safeIndex;

      stepElements.forEach(function (stepElement, index) {
        stepElement.classList.toggle("is-active", index === safeIndex);
      });

      if (progressFill) {
        progressFill.style.width = ((safeIndex + 1) / missionSteps.length) * 100 + "%";
      }

      if (insightElement) {
        insightElement.textContent = step.insight;
      }

      if (stateElement) {
        stateElement.textContent = step.stateLabel;
        stateElement.dataset.state = step.stateKind;
      }

      if (runtimeEventElement) {
        runtimeEventElement.textContent = step.runtimeEvent;
      }

      if (apiRouteElement) {
        apiRouteElement.textContent = step.apiRoute;
      }

      if (apiCodeElement) {
        apiCodeElement.textContent = JSON.stringify(step.apiPayload, null, 2);
      }

      simNodes.forEach(function (node) {
        const nodeName = node.dataset.node;
        node.classList.toggle("is-live", step.activeNodes.indexOf(nodeName) !== -1);
        node.classList.toggle("is-alert", step.alertNodes.indexOf(nodeName) !== -1);
      });

      simLinks.forEach(function (link) {
        const linkName = link.dataset.link;
        link.classList.toggle("is-live", step.activeLinks.indexOf(linkName) !== -1);
        link.classList.toggle("is-alert", step.alertLinks.indexOf(linkName) !== -1);
      });

      if (robotElement) {
        robotElement.style.setProperty("--robot-x", step.robot.x);
        robotElement.style.setProperty("--robot-y", step.robot.y);
        robotElement.classList.toggle("is-alert", step.robotBlocked);
      }
    }

    function stopAutoplay() {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      timerId = window.setInterval(function () {
        renderStep(currentStepIndex + 1);
      }, stepDurationMs);
    }

    stepButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const parentStep = button.closest(".engine-sim-step");

        if (!parentStep) {
          return;
        }

        const selectedStep = Number(parentStep.dataset.step);

        if (Number.isNaN(selectedStep)) {
          return;
        }

        renderStep(selectedStep);
        startAutoplay();
      });
    });

    viewButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setView(button.dataset.simView);
      });
    });

    missionSection.addEventListener("mouseenter", stopAutoplay);
    missionSection.addEventListener("mouseleave", startAutoplay);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    setView("flow");
    renderStep(0);
    startAutoplay();
  }
});
