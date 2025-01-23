<!-- filepath: /F:/Fusion_Projectss/Vue/VueApp/src/components/BarChart.vue -->
<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
    salesData: { date: string; amount: number }[];
}>();

const canvas = ref<HTMLCanvasElement | null>(null);

const renderChart = () => {
    if (canvas.value && props.salesData.length > 0) {
        new Chart(canvas.value, {
            type: 'bar',
            data: {
                labels: props.salesData.map((sale) => sale.date),
                datasets: [
                    {
                        label: 'Sales Amount',
                        data: props.salesData.map((sale) => sale.amount),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
};

onMounted(renderChart);
watch(() => props.salesData, renderChart);
</script>

<style scoped>
canvas {
    max-width: 100%;
}
</style>