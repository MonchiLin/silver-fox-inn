import type {Plugin} from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import type {ExecFileException} from "node:child_process";

export function keepIsr(): Plugin {
  return {
    name: 'vite-plugin-keep-isr',
    apply: 'build',
    async closeBundle() {
      console.log("[vite-plugin-keep-isr] Starting copy operation...");
      const publicIsrPath = path.resolve('public', 'isr');
      const distClientIsrPath = path.resolve('dist', 'client', 'isr');

      try {
        // 验证源目录是否存在
        await fs.access(publicIsrPath);

        // 检查源目录是否为空
        const files = await fs.readdir(publicIsrPath);
        if (files.length === 0) {
          console.warn(`[vite-plugin-keep-isr] Warning: ${publicIsrPath} is empty. Skipping copy.`);
          return;
        }

        // 确保目标父目录存在
        const distClientPath = path.resolve('dist', 'client');
        await fs.mkdir(distClientPath, { recursive: true });

        // 清空并复制目录
        await fs.rm(distClientIsrPath, { recursive: true, force: true });
        await fs.cp(publicIsrPath, distClientIsrPath, {
          recursive: true,
          force: true,
          preserveTimestamps: true
        });

        console.log(`\n[vite-plugin-keep-isr] Successfully copied ${publicIsrPath} to ${distClientIsrPath}`);
      } catch (error) {
        const err = error as ExecFileException;
        if (err.code === 'ENOENT') {
          console.warn(`\n[vite-plugin-keep-isr] Warning: ${publicIsrPath} not found. Skipping copy.`);
        } else {
          console.error(`\n[vite-plugin-keep-isr] Error copying directory:`, error);
        }
      }
    },
  };
}
