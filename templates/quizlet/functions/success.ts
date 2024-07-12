'use server'
import type { BuildFrameData, FrameActionPayload, FrameButtonMetadata } from '@/lib/farcaster'
import type { Config, Storage } from '..'
import initial from './initial'

export default async function success(
    body: FrameActionPayload,
    config: Config,
    storage: Storage
): Promise<BuildFrameData> {
    const buttons: FrameButtonMetadata[] = [
        {
            label: 'Create Your Own',
            action: 'link',
            target: 'https://frametra.in',
        },
    ]

    if (!config.success.image || body.untrustedData.buttonIndex === 1) {
        return initial(config, storage)
    }

    if (config.success.url) {
        buttons.push({
            label: config.success.label ?? 'Open Link',
            action: 'link',
            target: config.success.url,
        })
    }

    return {
        buttons,
        image: config.success.image,
        aspectRatio:
            config.success.image && config.success.aspectRatio !== undefined
                ? config.success.aspectRatio === '1.91/1'
                    ? '1.91:1'
                    : '1:1'
                : undefined,
    }
}
