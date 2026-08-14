<script lang="ts">
	import { onMount } from 'svelte';

	type Circle = {
		x: number;
		y: number;
		translateX: number;
		translateY: number;
		size: number;
		alpha: number;
		targetAlpha: number;
		dx: number;
		dy: number;
		magnetism: number;
	};

	let {
		class: className = '',
		quantity = 30,
		staticity = 50,
		ease = 50
	}: {
		class?: string;
		quantity?: number;
		staticity?: number;
		ease?: number;
	} = $props();

	let canvasRef: HTMLCanvasElement;
	let canvasContainerRef: HTMLDivElement;

	onMount(() => {
		const context = canvasRef.getContext('2d');
		if (!context) return;

		const dpr = window.devicePixelRatio;
		const mouse = { x: 0, y: 0 };
		const canvasSize = { w: 0, h: 0 };
		let circles: Circle[] = [];
		let animationFrame = 0;
		let particleRgb = '255 255 255';

		const readParticleColor = () => {
			particleRgb =
				getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb').trim() ||
				'255 255 255';
		};

		const circleParams = (): Circle => ({
			x: Math.floor(Math.random() * canvasSize.w),
			y: Math.floor(Math.random() * canvasSize.h),
			translateX: 0,
			translateY: 0,
			size: Math.floor(Math.random() * 2) + 0.1,
			alpha: 0,
			targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
			dx: (Math.random() - 0.5) * 0.2,
			dy: (Math.random() - 0.5) * 0.2,
			magnetism: 0.1 + Math.random() * 4
		});

		const clearContext = () => context.clearRect(0, 0, canvasSize.w, canvasSize.h);

		const drawCircle = (circle: Circle, update = false) => {
			const { x, y, translateX, translateY, size, alpha } = circle;
			context.translate(translateX, translateY);
			context.beginPath();
			context.arc(x, y, size, 0, 2 * Math.PI);
			context.fillStyle = `rgb(${particleRgb} / ${alpha})`;
			context.fill();
			context.setTransform(dpr, 0, 0, dpr, 0, 0);
			if (!update) circles.push(circle);
		};

		const resizeCanvas = () => {
			circles = [];
			canvasSize.w = canvasContainerRef.offsetWidth;
			canvasSize.h = canvasContainerRef.offsetHeight;
			canvasRef.width = canvasSize.w * dpr;
			canvasRef.height = canvasSize.h * dpr;
			canvasRef.style.width = `${canvasSize.w}px`;
			canvasRef.style.height = `${canvasSize.h}px`;
			context.scale(dpr, dpr);
		};

		const initCanvas = () => {
			resizeCanvas();
			clearContext();
			for (let i = 0; i < quantity; i++) drawCircle(circleParams());
		};

		const onPointerMove = (event: PointerEvent) => {
			const rect = canvasRef.getBoundingClientRect();
			const { w, h } = canvasSize;
			const x = event.clientX - rect.left - w / 2;
			const y = event.clientY - rect.top - h / 2;
			if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
				mouse.x = x;
				mouse.y = y;
			}
		};

		const remapValue = (
			value: number,
			start1: number,
			end1: number,
			start2: number,
			end2: number
		) => {
			const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
			return remapped > 0 ? remapped : 0;
		};

		const animate = () => {
			clearContext();
			circles.forEach((circle, i) => {
				const edge = [
					circle.x + circle.translateX - circle.size,
					canvasSize.w - circle.x - circle.translateX - circle.size,
					circle.y + circle.translateY - circle.size,
					canvasSize.h - circle.y - circle.translateY - circle.size
				];
				const closestEdge = edge.reduce((a, b) => Math.min(a, b));
				const remapClosestEdge = Number.parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));

				if (remapClosestEdge > 1) {
					circle.alpha += 0.02;
					if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
				} else {
					circle.alpha = circle.targetAlpha * remapClosestEdge;
				}

				circle.x += circle.dx;
				circle.y += circle.dy;
				circle.translateX += (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;
				circle.translateY += (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;

				if (
					circle.x < -circle.size ||
					circle.x > canvasSize.w + circle.size ||
					circle.y < -circle.size ||
					circle.y > canvasSize.h + circle.size
				) {
					circles.splice(i, 1);
					drawCircle(circleParams());
				} else {
					drawCircle(circle, true);
				}
			});
			animationFrame = requestAnimationFrame(animate);
		};

		readParticleColor();
		initCanvas();
		animate();

		window.addEventListener('resize', initCanvas);
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('themechange', readParticleColor);

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', initCanvas);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('themechange', readParticleColor);
		};
	});
</script>

<div class={className} bind:this={canvasContainerRef} aria-hidden="true">
	<canvas bind:this={canvasRef}></canvas>
</div>
