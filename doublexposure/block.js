( function( blocks, editor, element, components ) {
 
	const el = element.createElement;
	const { __ } = wp.i18n;
 
	const { registerBlockType } = blocks;
	
	const { InspectorControls, MediaUpload, MediaUploadCheck } = editor;
	const { Fragment } = element;
	const { TextControl, Panel, PanelBody, PanelRow, Button } = components;

	const printLayer = (type, url, className='', alt='') => {
		if(type === 'image')
			return el('img', {src:url, className, alt});
		
		if(type === 'video')
		{
			let attr = {src:url, className, alt, muted:true, autoplay:''}
			if(className==='background') attr.loop = ''
			return el('video', attr);
		}
		
		return el('object', {data:url, className, alt});
	}

	registerBlockType( 'kalamun/block-kalamun-oa-doublexposure', {
		title: 'Double exposure',
		icon: 'align-wide',
		category: 'kalamun-blocks',
		keywords: [ 'double exposure', 'doublexposure', 'kalamun' ],

		attributes: {
			background: {
				type: 'string',
				default: ''
			},
			backgroundId: {
				type: 'number',
				default: 0
			},
			backgroundType: {
				type: 'string',
				default: ''
			},
			fadein: {
				type: 'string',
				default: ''
			},
			fadeinId: {
				type: 'number',
				default: 0
			},
			fadeinType: {
				type: 'string',
				default: ''
			},
			mask: {
				type: 'string',
				default: ''
			},
			maskId: {
				type: 'number',
				default: 0
			},
			maskType: {
				type: 'string',
				default: ''
			},
			alt: {
				type: 'string',
				default: ''
			},
			subtitle: {
				type: 'string',
				default: ''
			},
		},

		edit: (props) => {
				const onUpdateBackground = ( image ) => {
					props.setAttributes( {
						background: image.url,
						backgroundId: image.id,
						backgroundType: image.type,
					} )
				}

				const onUpdateMask = ( image ) => {
					props.setAttributes( {
						mask: image.url,
						maskId: image.id,
						maskType: image.type,
					} )
				}
			
				const onUpdateFadein = ( image ) => {
					props.setAttributes( {
						fadein: image.url,
						fadeinId: image.id,
						fadeinType: image.type,
					} )
				}

				return (
					el( Fragment, {},
						el( InspectorControls, {},
							el( Panel, {},
								el( PanelBody, { title: 'Immagini', icon: 'more', initialOpen: true },
									el( PanelRow, {},
										el( MediaUpload, {
											title: __('Mask', 'doublexposure'),
											onSelect: onUpdateMask,
											value: props.attributes.maskId,
											render: ({open}) => ( el(Button, {
												onClick: open
											}, 'Set the mask'))
										})
									),
									el( PanelRow, {},
										el( MediaUpload, {
											title: __('Fade-in', 'doublexposure'),
											onSelect: onUpdateFadein,
											value: props.attributes.fadeinId,
											render: ({open}) => ( el(Button, {
												onClick: open
											}, 'Set the fade-in'))
										})
									),
									el( PanelRow, {},
										el( MediaUpload, {
											title: __('Background', 'doublexposure'),
											onSelect: onUpdateBackground,
											value: props.attributes.backgroundId,
											render: ({open}) => ( el(Button, {
												onClick: open
											}, 'Set background image'))
										}),
									),
									el( PanelRow, {},
										el( TextControl, {
											label: 'Alt',
											value: props.attributes.alt,
											onChange: (alt) => props.setAttributes({alt}),
										} )
									),
									el( PanelRow, {},
										el( TextControl, {
											label: 'Subtitle',
											value: props.attributes.subtitle,
											onChange: (subtitle) => props.setAttributes({subtitle}),
										} )
									),
								),
							),
						),

						el( 'div', { className: 'kalamun-oa-doublexposure' },
							printLayer(props.attributes.maskType, props.attributes.mask, 'mask'),
							printLayer(props.attributes.fadeinType, props.attributes.fadein, 'fadein'),
							printLayer(props.attributes.backgroundType, props.attributes.background, 'background'),
							( props.attributes.alt !== '' ? el( 'h1', {}, props.attributes.alt ) : false ),
							( props.attributes.subtitle !== '' ? el( 'h2', {}, props.attributes.subtitle ) : false ),
						)
					)
				);
			}
		,

		save: (props) => {
			return (
				el( Fragment, {},	 
					el( 'div', { className: 'kalamun-oa-doublexposure' },
						printLayer(props.attributes.maskType, props.attributes.mask, 'mask'),
						printLayer(props.attributes.fadeinType, props.attributes.fadein, 'fadein'),
						printLayer(props.attributes.backgroundType, props.attributes.background, 'background'),
						( props.attributes.alt !== '' ? el( 'h1', {}, props.attributes.alt ) : false ),
						( props.attributes.subtitle !== '' ? el( 'h2', {}, props.attributes.subtitle ) : false ),
					)
				)
			);
		}
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.element,
	window.wp.components,
);
