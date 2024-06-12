import { defaultConfig } from '../constants'
import { deepMerge } from '@oleksii-pavlov/deep-merge'
import { Config } from '../types/config'

export function normalizeConfig(config: Config): Required<Config> {
  return deepMerge(defaultConfig, config)
}