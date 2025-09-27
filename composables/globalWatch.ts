import type {
  MapOldSources,
  MapSources,
  WatchDebouncedOptions,
} from '@vueuse/core'
import type { WatchCallback, WatchSource } from 'vue'

const watchers = new Set<string>()

export interface GlobalWatchOptions extends WatchDebouncedOptions<boolean> {
  key: string
}

// --- overloads ---
export function useGlobalWatch<T>(
  source: WatchSource<T> | (() => T),
  cb: WatchCallback<T, T | undefined>,
  options: GlobalWatchOptions
): void

export function useGlobalWatch<T extends Readonly<WatchSource<unknown>[]>>(
  source: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, false>>,
  options: GlobalWatchOptions
): void

// --- implementation ---
export function useGlobalWatch(
  source: any,
  cb: any,
  options: GlobalWatchOptions
): void {
  if (!watchers.has(options.key)) {
    watchers.add(options.key)
    const stop = debouncedWatch(source, cb, options)

    onUnmounted(() => {
      stop()
      watchers.delete(options.key)
    })
  }
}
