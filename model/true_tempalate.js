export default [
  {
    "_id": "663363a4c6c8cb8b784acd0e",
    "name": "测试用文生图工作流",
    "description": "测试用文生图工作流",
    "preview_imgs": [
      "https://creart-1300279601.cos.ap-shanghai.myqcloud.com/products/normal_text2img_2.jpeg"
    ],
    "tags": [
      "写实"
    ],
    "allow_products": [
      "拼图",
      "壁画",
      "卡片"
    ],
    "workflow": {
      "prompt": {
        "3": {
          "inputs": {
            "seed": 423402512705556,
            "steps": 20,
            "cfg": 8,
            "sampler_name": "euler",
            "scheduler": "normal",
            "denoise": 1,
            "model": [
              "4",
              0
            ],
            "positive": [
              "6",
              0
            ],
            "negative": [
              "7",
              0
            ],
            "latent_image": [
              "5",
              0
            ]
          },
          "class_type": "KSampler",
          "_meta": {
            "title": "KSampler"
          }
        },
        "4": {
          "inputs": {
            "ckpt_name": "768-v-ema.ckpt"
          },
          "class_type": "CheckpointLoaderSimple",
          "_meta": {
            "title": "Load Checkpoint"
          }
        },
        "5": {
          "inputs": {
            "width": 512,
            "height": 512,
            "batch_size": 1
          },
          "class_type": "EmptyLatentImage",
          "_meta": {
            "title": "Empty Latent Image"
          }
        },
        "6": {
          "inputs": {
            "text": "beautiful scenery nature glass bottle landscape, purple galaxy bottle,",
            "clip": [
              "4",
              1
            ]
          },
          "class_type": "CLIPTextEncode",
          "_meta": {
            "title": "Positive Text"
          }
        },
        "7": {
          "inputs": {
            "text": "text, watermark",
            "clip": [
              "4",
              1
            ]
          },
          "class_type": "CLIPTextEncode",
          "_meta": {
            "title": "Negative Text"
          }
        },
        "8": {
          "inputs": {
            "samples": [
              "3",
              0
            ],
            "vae": [
              "4",
              2
            ]
          },
          "class_type": "VAEDecode",
          "_meta": {
            "title": "VAE Decode"
          }
        },
        "9": {
          "inputs": {
            "filename_prefix": "ComfyUI",
            "images": [
              "8",
              0
            ]
          },
          "class_type": "SaveImage",
          "_meta": {
            "title": "Save Image"
          }
        }
      },
      "params": {
        "negative": {
          "name": "反向提示词",
          "type": "string",
          "default": null,
          "description": null,
          "required": false,
          "position_node_id": "7",
          "position_input_name": "text"
        },
        "positive": {
          "name": "正向提示词",
          "type": "string",
          "default": null,
          "description": null,
          "required": true,
          "position_node_id": "6",
          "position_input_name": "text"
        }
      }
    },
    "render": "ComfyUI",
    "online_status": 1
  },
  {
    "_id": "668686aef5259e3523f30bef",
    "name": "测试用图生图工作流",
    "description": "测试用图生图工作流",
    "preview_imgs": [
      "https://creart-1300279601.cos.ap-shanghai.myqcloud.com/products/normal_text2img.png"
    ],
    "tags": [
      "测试标签"
    ],
    "allow_products": [
      "测试产品"
    ],
    "workflow": {
      "prompt": {
        "3": {
          "inputs": {
            "seed": 8,
            "steps": 25,
            "cfg": 6.5,
            "sampler_name": "dpmpp_2m_sde_gpu",
            "scheduler": "karras",
            "denoise": 0.65,
            "model": [
              "4",
              0
            ],
            "positive": [
              "6",
              0
            ],
            "negative": [
              "7",
              0
            ],
            "latent_image": [
              "18",
              0
            ]
          },
          "class_type": "KSampler",
          "_meta": {
            "title": "KSampler"
          }
        },
        "4": {
          "inputs": {
            "ckpt_name": "dreamshaper_8.safetensors"
          },
          "class_type": "CheckpointLoaderSimple",
          "_meta": {
            "title": "Load Checkpoint"
          }
        },
        "6": {
          "inputs": {
            "text": "a logo of a pink deer, geometric\n\nhigh resolution, detailed, 4k",
            "clip": [
              "4",
              1
            ]
          },
          "class_type": "CLIPTextEncode",
          "_meta": {
            "title": "CLIP Text Encode (Positive)"
          }
        },
        "7": {
          "inputs": {
            "text": "blurry, illustration, drawing, horror",
            "clip": [
              "4",
              1
            ]
          },
          "class_type": "CLIPTextEncode",
          "_meta": {
            "title": "CLIP Text Encode (Negative)"
          }
        },
        "8": {
          "inputs": {
            "samples": [
              "3",
              0
            ],
            "vae": [
              "4",
              2
            ]
          },
          "class_type": "VAEDecode",
          "_meta": {
            "title": "VAE Decode"
          }
        },
        "9": {
          "inputs": {
            "filename_prefix": "Result",
            "images": [
              "8",
              0
            ]
          },
          "class_type": "SaveImage",
          "_meta": {
            "title": "Save Image"
          }
        },
        "15": {
          "inputs": {
            "image": "example.png",
            "upload": "image"
          },
          "class_type": "LoadImage",
          "_meta": {
            "title": "Load Image"
          }
        },
        "16": {
          "inputs": {
            "pixels": [
              "17",
              0
            ],
            "vae": [
              "4",
              2
            ]
          },
          "class_type": "VAEEncode",
          "_meta": {
            "title": "VAE Encode"
          }
        },
        "17": {
          "inputs": {
            "upscale_method": "lanczos",
            "width": 512,
            "height": 512,
            "crop": "disabled",
            "image": [
              "15",
              0
            ]
          },
          "class_type": "ImageScale",
          "_meta": {
            "title": "Upscale Image"
          }
        },
        "18": {
          "inputs": {
            "amount": 4,
            "samples": [
              "16",
              0
            ]
          },
          "class_type": "RepeatLatentBatch",
          "_meta": {
            "title": "Repeat Latent Batch"
          }
        }
      },
      "params": {
        "positive": {
          "name": "正向提示词",
          "type": "string",
          "default": "a logo",
          "description": "正向提示词",
          "required": true,
          "position_node_id": "6",
          "position_input_name": "text"
        },
        "negative": {
          "name": "反向提示词",
          "type": "string",
          "default": "a logo",
          "description": "反向提示词",
          "required": true,
          "position_node_id": "6",
          "position_input_name": "text"
        },
        "image": {
          "name": "参考图",
          "type": "image",
          "default": "example.png",
          "description": "参考图",
          "required": true,
          "position_node_id": "15",
          "position_input_name": "image"
        }
      }
    },
    "render": "ComfyUI",
    "online_status": 1
  },
  {
    "_id": "66a71b2acda182fb2b9b24c5",
    "name": "头像转深度图",
    "description": "头像转深度图，用于 3D 雕刻",
    "preview_imgs": [
      "https://creart-1300279601.cos.ap-shanghai.myqcloud.com/products/depth_img_1.png"
    ],
    "tags": [
      "测试标签"
    ],
    "allow_products": [
      "测试产品"
    ],
    "workflow": {
      "prompt": {
        "10": {
          "inputs": {
            "seed": 203663097192072,
            "denoise_steps": 20,
            "n_repeat": 20,
            "regularizer_strength": 0.02,
            "reduction_method": "median",
            "max_iter": 5,
            "tol": 0.001,
            "invert": true,
            "keep_model_loaded": true,
            "n_repeat_batch_size": 1,
            "use_fp16": true,
            "scheduler": "DDIMScheduler",
            "normalize": true,
            "model": "Marigold",
            "image": [
              "36",
              0
            ]
          },
          "class_type": "MarigoldDepthEstimation",
          "_meta": {
            "title": "MarigoldDepthEstimation"
          }
        },
        "11": {
          "inputs": {
            "image": "20240319-234703 (1).jpg",
            "upload": "image"
          },
          "class_type": "LoadImage",
          "_meta": {
            "title": "Load Image"
          }
        },
        "13": {
          "inputs": {
            "upscale_method": "nearest-exact",
            "width": 768,
            "height": 1024,
            "crop": "center",
            "image": [
              "11",
              0
            ]
          },
          "class_type": "ImageScale",
          "_meta": {
            "title": "Upscale Image"
          }
        },
        "15": {
          "inputs": {
            "colorize_method": "Spectral",
            "image": [
              "10",
              0
            ]
          },
          "class_type": "ColorizeDepthmap",
          "_meta": {
            "title": "Colorize Depthmap"
          }
        },
        "21": {
          "inputs": {
            "control_net_name": "control_v11p_sd15_lineart.pth"
          },
          "class_type": "ControlNetLoader",
          "_meta": {
            "title": "Load ControlNet Model"
          }
        },
        "23": {
          "inputs": {
            "strength": 1,
            "start_percent": 0,
            "end_percent": 1,
            "positive": [
              "24",
              0
            ],
            "negative": [
              "25",
              0
            ],
            "control_net": [
              "21",
              0
            ],
            "image": [
              "34",
              0
            ]
          },
          "class_type": "ControlNetApplyAdvanced",
          "_meta": {
            "title": "Apply ControlNet (Advanced)"
          }
        },
        "24": {
          "inputs": {
            "text": "(relief:1.3), (gypsum sculpture), (monochrome:1.1), (garyscale:1.1), (high contrast:1.1), (sharp edges:1.1), (rim light:1.1), official art, black simple background, masterpiece, best quality, best details, (art xu beihong)",
            "clip": [
              "50",
              1
            ]
          },
          "class_type": "CLIPTextEncode",
          "_meta": {
            "title": "CLIP Text Encode (Prompt)"
          }
        },
        "25": {
          "inputs": {
            "text": "(((NSFW))), (((colorful))), (((color))), blurry, lowers, worstquality, shadow, realistic, reality, text, username, depth of field, (((black backgroom)))",
            "clip": [
              "50",
              1
            ]
          },
          "class_type": "CLIPTextEncode",
          "_meta": {
            "title": "CLIP Text Encode (Prompt)"
          }
        },
        "29": {
          "inputs": {
            "seed": 421127137541268,
            "steps": 30,
            "cfg": 8,
            "sampler_name": "dpmpp_sde",
            "scheduler": "karras",
            "denoise": 1,
            "latent_image": [
              "35",
              0
            ]
          },
          "class_type": "KSampler",
          "_meta": {
            "title": "KSampler"
          }
        },
        "33": {
          "inputs": {
            "ckpt_name": "Deliberate_v5.safetensors"
          },
          "class_type": "CheckpointLoaderSimple",
          "_meta": {
            "title": "Load Checkpoint"
          }
        },
        "34": {
          "inputs": {
            "preprocessor": "LineArtPreprocessor",
            "resolution": 768,
            "image": [
              "13",
              0
            ]
          },
          "class_type": "AIO_Preprocessor",
          "_meta": {
            "title": "AIO Aux Preprocessor"
          }
        },
        "35": {
          "inputs": {
            "pixels": [
              "13",
              0
            ]
          },
          "class_type": "VAEEncode",
          "_meta": {
            "title": "VAE Encode"
          }
        },
        "36": {
          "inputs": {
            "samples": [
              "29",
              0
            ]
          },
          "class_type": "VAEDecode",
          "_meta": {
            "title": "VAE Decode"
          }
        },
        "50": {
          "inputs": {
            "lora_name": "Monochrome - Greyscale.safetensors",
            "strength_model": 0.7000000000000001,
            "strength_clip": 0.7000000000000001
          },
          "class_type": "LoraLoader",
          "_meta": {
            "title": "Load LoRA"
          }
        },
        "51": {
          "inputs": {
            "seed": 421127137541754,
            "steps": 25,
            "cfg": 7.640000000000001,
            "sampler_name": "dpmpp_sde",
            "scheduler": "karras",
            "denoise": 0.3,
            "latent_image": [
              "52",
              0
            ]
          },
          "class_type": "KSampler",
          "_meta": {
            "title": "KSampler"
          }
        },
        "52": {
          "inputs": {
            "pixels": [
              "76",
              0
            ],
            "vae": [
              "33",
              2
            ]
          },
          "class_type": "VAEEncode",
          "_meta": {
            "title": "VAE Encode"
          }
        },
        "53": {
          "inputs": {
            "samples": [
              "51",
              0
            ]
          },
          "class_type": "VAEDecode",
          "_meta": {
            "title": "VAE Decode"
          }
        },
        "55": {
          "inputs": {
            "MODEL": [
              "33",
              0
            ],
            "CLIP": [
              "33",
              1
            ],
            "VAE": [
              "33",
              2
            ]
          },
          "class_type": "Anything Everywhere3",
          "_meta": {
            "title": "Anything Everywhere3"
          }
        },
        "60": {
          "inputs": {
            "preprocessor": "TilePreprocessor",
            "resolution": 1024,
            "image": [
              "53",
              0
            ]
          },
          "class_type": "AIO_Preprocessor",
          "_meta": {
            "title": "AIO Aux Preprocessor"
          }
        },
        "61": {
          "inputs": {
            "control_net_name": "control_v11f1e_sd15_tile.pth"
          },
          "class_type": "ControlNetLoader",
          "_meta": {
            "title": "Load ControlNet Model"
          }
        },
        "62": {
          "inputs": {
            "strength": 0.5,
            "start_percent": 0,
            "end_percent": 1,
            "control_net": [
              "61",
              0
            ],
            "image": [
              "53",
              0
            ]
          },
          "class_type": "ControlNetApplyAdvanced",
          "_meta": {
            "title": "Apply ControlNet (Advanced)"
          }
        },
        "63": {
          "inputs": {
            "seed": 421127137541084,
            "steps": 20,
            "cfg": 7.05,
            "sampler_name": "dpmpp_sde",
            "scheduler": "karras",
            "denoise": 0.3,
            "positive": [
              "62",
              0
            ],
            "negative": [
              "62",
              1
            ],
            "latent_image": [
              "66",
              0
            ]
          },
          "class_type": "KSampler",
          "_meta": {
            "title": "KSampler"
          }
        },
        "66": {
          "inputs": {
            "pixels": [
              "53",
              0
            ]
          },
          "class_type": "VAEEncode",
          "_meta": {
            "title": "VAE Encode"
          }
        },
        "67": {
          "inputs": {
            "samples": [
              "63",
              0
            ]
          },
          "class_type": "VAEDecode",
          "_meta": {
            "title": "VAE Decode"
          }
        },
        "76": {
          "inputs": {
            "min": -0.73,
            "max": 1.1,
            "clamp": true,
            "image": [
              "10",
              0
            ]
          },
          "class_type": "RemapDepth",
          "_meta": {
            "title": "Remap Depth"
          }
        },
        "85": {
          "inputs": {
            "title_regex": ".*",
            "input_regex": "positive",
            "group_regex": "",
            "CONDITIONING": [
              "23",
              0
            ]
          },
          "class_type": "Anything Everywhere?",
          "_meta": {
            "title": "Anything Everywhere?"
          }
        },
        "86": {
          "inputs": {
            "title_regex": ".*",
            "input_regex": "negative",
            "group_regex": "",
            "CONDITIONING": [
              "23",
              1
            ]
          },
          "class_type": "Anything Everywhere?",
          "_meta": {
            "title": "Anything Everywhere?"
          }
        },
        "97": {
          "inputs": {
            "min": -0.4,
            "max": 1.08,
            "clamp": true,
            "image": [
              "67",
              0
            ]
          },
          "class_type": "RemapDepth",
          "_meta": {
            "title": "Remap Depth"
          }
        },
        "100": {
          "inputs": {
            "filename_prefix": "depth_img",
            "images": [
              "97",
              0
            ]
          },
          "class_type": "SaveImage",
          "_meta": {
            "title": "Save Image"
          }
        }
      },
      "params": {
        "avatar": {
          "name": "头像",
          "type": "image",
          "default": "",
          "description": "头像，建议比例 1:1",
          "required": true,
          "position_node_id": "11",
          "position_input_name": "image"
        }
      }
    },
    "render": "ComfyUI",
    "online_status": 1
  },
  {
    "_id": "66a71fa62b6e7305c1bfb5b8",
    "name": "头像转贴纸（透明底）",
    "description": "头像转贴纸，不干胶等打印",
    "preview_imgs": [
      "https://creart-1300279601.cos.ap-shanghai.myqcloud.com/products/sticker_1.png",
      "https://creart-1300279601.cos.ap-shanghai.myqcloud.com/products/sticker_2.png",
      "https://creart-1300279601.cos.ap-shanghai.myqcloud.com/products/sticker_3.png"
    ],
    "tags": [
      "测试标签"
    ],
    "allow_products": [
      "测试产品"
    ],
    "workflow": {
      "prompt": {
        "last_node_id": 639,
        "last_link_id": 1066,
        "nodes": [
          {
            "id": 558,
            "type": "Automatic CFG",
            "pos": [
              3750,
              360
            ],
            "size": {
              "0": 315,
              "1": 82
            },
            "flags": {},
            "order": 23,
            "mode": 0,
            "inputs": [
              {
                "name": "model",
                "type": "MODEL",
                "link": 948,
                "label": "模型"
              }
            ],
            "outputs": [
              {
                "name": "MODEL",
                "type": "MODEL",
                "links": [
                  1056
                ],
                "shape": 3,
                "label": "模型",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "Automatic CFG"
            },
            "widgets_values": [
              false,
              true
            ]
          },
          {
            "id": 559,
            "type": "KSamplerSelect",
            "pos": [
              3750,
              500
            ],
            "size": {
              "0": 315,
              "1": 58
            },
            "flags": {},
            "order": 0,
            "mode": 0,
            "outputs": [
              {
                "name": "SAMPLER",
                "type": "SAMPLER",
                "links": [
                  940
                ],
                "shape": 3,
                "label": "采样器"
              }
            ],
            "properties": {
              "Node name for S&R": "KSamplerSelect"
            },
            "widgets_values": [
              "dpmpp_2m"
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 561,
            "type": "AlignYourStepsScheduler",
            "pos": [
              3750,
              630
            ],
            "size": {
              "0": 315,
              "1": 106
            },
            "flags": {},
            "order": 1,
            "mode": 0,
            "outputs": [
              {
                "name": "SIGMAS",
                "type": "SIGMAS",
                "links": [
                  942
                ],
                "shape": 3,
                "label": "Sigmas"
              }
            ],
            "properties": {
              "Node name for S&R": "AlignYourStepsScheduler"
            },
            "widgets_values": [
              "SDXL",
              20,
              1
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 615,
            "type": "LayerUtility: PurgeVRAM",
            "pos": [
              4050,
              870
            ],
            "size": {
              "0": 315,
              "1": 82
            },
            "flags": {},
            "order": 25,
            "mode": 0,
            "inputs": [
              {
                "name": "anything",
                "type": "*",
                "link": 1023,
                "label": "anything"
              }
            ],
            "properties": {
              "Node name for S&R": "LayerUtility: PurgeVRAM"
            },
            "widgets_values": [
              false,
              false
            ]
          },
          {
            "id": 556,
            "type": "SamplerCustom",
            "pos": [
              4090,
              330
            ],
            "size": {
              "0": 270,
              "1": 442
            },
            "flags": {},
            "order": 24,
            "mode": 0,
            "inputs": [
              {
                "name": "model",
                "type": "MODEL",
                "link": 1056,
                "label": "模型",
                "slot_index": 0
              },
              {
                "name": "positive",
                "type": "CONDITIONING",
                "link": 1051,
                "label": "正面条件",
                "slot_index": 1
              },
              {
                "name": "negative",
                "type": "CONDITIONING",
                "link": 959,
                "label": "负面条件",
                "slot_index": 2
              },
              {
                "name": "sampler",
                "type": "SAMPLER",
                "link": 940,
                "label": "采样器",
                "slot_index": 3
              },
              {
                "name": "sigmas",
                "type": "SIGMAS",
                "link": 942,
                "label": "Sigmas",
                "slot_index": 4
              },
              {
                "name": "latent_image",
                "type": "LATENT",
                "link": 970,
                "label": "Latent",
                "slot_index": 5
              }
            ],
            "outputs": [
              {
                "name": "output",
                "type": "LATENT",
                "links": [
                  1023,
                  1057
                ],
                "shape": 3,
                "label": "输出",
                "slot_index": 0
              },
              {
                "name": "denoised_output",
                "type": "LATENT",
                "links": null,
                "shape": 3,
                "label": "降噪输出"
              }
            ],
            "properties": {
              "Node name for S&R": "SamplerCustom"
            },
            "widgets_values": [
              true,
              972393920901236,
              "randomize",
              7.5
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 568,
            "type": "VAELoader",
            "pos": [
              4420,
              350
            ],
            "size": {
              "0": 315,
              "1": 58
            },
            "flags": {},
            "order": 2,
            "mode": 0,
            "outputs": [
              {
                "name": "VAE",
                "type": "VAE",
                "links": [
                  952
                ],
                "shape": 3
              }
            ],
            "properties": {
              "Node name for S&R": "VAELoader"
            },
            "widgets_values": [
              "sdxl_vae.safetensors"
            ],
            "category": "Primitive Nodes"
          },
          {
            "id": 610,
            "type": "BRIA_RMBG_ModelLoader_Zho",
            "pos": [
              4840,
              370
            ],
            "size": {
              "0": 210,
              "1": 26
            },
            "flags": {},
            "order": 3,
            "mode": 0,
            "outputs": [
              {
                "name": "rmbgmodel",
                "type": "RMBGMODEL",
                "links": [
                  1020
                ],
                "shape": 3,
                "label": "rmbgmodel",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "BRIA_RMBG_ModelLoader_Zho"
            }
          },
          {
            "id": 613,
            "type": "LayerUtility: PurgeVRAM",
            "pos": [
              1290,
              970
            ],
            "size": {
              "0": 315,
              "1": 82
            },
            "flags": {},
            "order": 14,
            "mode": 0,
            "inputs": [
              {
                "name": "anything",
                "type": "*",
                "link": 1022,
                "label": "anything"
              }
            ],
            "properties": {
              "Node name for S&R": "LayerUtility: PurgeVRAM"
            },
            "widgets_values": [
              true,
              true
            ]
          },
          {
            "id": 579,
            "type": "CR Text",
            "pos": [
              2100,
              440
            ],
            "size": {
              "0": 320,
              "1": 130
            },
            "flags": {},
            "order": 4,
            "mode": 0,
            "outputs": [
              {
                "name": "text",
                "type": "*",
                "links": [
                  1060
                ],
                "shape": 3,
                "slot_index": 0,
                "label": "文本"
              },
              {
                "name": "show_help",
                "type": "STRING",
                "links": [],
                "shape": 3,
                "slot_index": 1,
                "label": "显示帮助"
              }
            ],
            "properties": {
              "Node name for S&R": "CR Text"
            },
            "widgets_values": [
              ", split solid color background, cartoon portrait, ((looking at viewer)), clear background, best quality"
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 314,
            "type": "CR Simple Prompt List Keyframes",
            "pos": [
              1730,
              400
            ],
            "size": {
              "0": 340,
              "1": 200
            },
            "flags": {},
            "order": 15,
            "mode": 0,
            "inputs": [
              {
                "name": "simple_prompt_list",
                "type": "SIMPLE_PROMPT_LIST",
                "link": 1027,
                "label": "提示词列表(简易)"
              }
            ],
            "outputs": [
              {
                "name": "keyframe_list",
                "type": "STRING",
                "links": [
                  590
                ],
                "shape": 3,
                "label": "关键帧列表",
                "slot_index": 0
              },
              {
                "name": "show_help",
                "type": "STRING",
                "links": null,
                "shape": 3,
                "label": "显示帮助"
              }
            ],
            "properties": {
              "Node name for S&R": "CR Simple Prompt List Keyframes"
            },
            "widgets_values": [
              1,
              1,
              "Default",
              "Default",
              "Default",
              "Deforum"
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 580,
            "type": "ConcatText_Zho",
            "pos": [
              2470,
              470
            ],
            "size": {
              "0": 210,
              "1": 54
            },
            "flags": {},
            "order": 16,
            "mode": 0,
            "inputs": [
              {
                "name": "text_1",
                "type": "STRING",
                "link": 1060,
                "widget": {
                  "name": "text_1"
                },
                "label": "text_1"
              },
              {
                "name": "text_2",
                "type": "STRING",
                "link": 1059,
                "widget": {
                  "name": "text_2"
                },
                "label": "text_2"
              }
            ],
            "outputs": [
              {
                "name": "text",
                "type": "STRING",
                "links": [
                  968
                ],
                "shape": 3,
                "slot_index": 0,
                "label": "text"
              }
            ],
            "properties": {
              "Node name for S&R": "ConcatText_Zho"
            },
            "widgets_values": [
              "",
              ""
            ]
          },
          {
            "id": 552,
            "type": "IPAdapterStyleComposition",
            "pos": [
              3340,
              680
            ],
            "size": {
              "0": 315,
              "1": 322
            },
            "flags": {},
            "order": 22,
            "mode": 0,
            "inputs": [
              {
                "name": "model",
                "type": "MODEL",
                "link": 988,
                "label": "模型",
                "slot_index": 0
              },
              {
                "name": "ipadapter",
                "type": "IPADAPTER",
                "link": 932,
                "label": "IPAdapter",
                "slot_index": 1
              },
              {
                "name": "image_style",
                "type": "IMAGE",
                "link": 986,
                "label": "风格图像"
              },
              {
                "name": "image_composition",
                "type": "IMAGE",
                "link": 987,
                "label": "合成图像"
              },
              {
                "name": "image_negative",
                "type": "IMAGE",
                "link": null,
                "label": "负面图像"
              },
              {
                "name": "attn_mask",
                "type": "MASK",
                "link": null,
                "label": "关注层遮罩"
              },
              {
                "name": "clip_vision",
                "type": "CLIP_VISION",
                "link": null,
                "label": "CLIP视觉"
              }
            ],
            "outputs": [
              {
                "name": "MODEL",
                "type": "MODEL",
                "links": [
                  948
                ],
                "shape": 3,
                "label": "模型",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "IPAdapterStyleComposition"
            },
            "widgets_values": [
              0.7000000000000001,
              0.7000000000000001,
              false,
              "average",
              0,
              1,
              "V only"
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 554,
            "type": "IPAdapterUnifiedLoader",
            "pos": [
              3340,
              510
            ],
            "size": {
              "0": 315,
              "1": 78
            },
            "flags": {},
            "order": 19,
            "mode": 0,
            "inputs": [
              {
                "name": "model",
                "type": "MODEL",
                "link": 990,
                "label": "模型",
                "slot_index": 0
              },
              {
                "name": "ipadapter",
                "type": "IPADAPTER",
                "link": null,
                "label": "IPAdapter"
              }
            ],
            "outputs": [
              {
                "name": "model",
                "type": "MODEL",
                "links": [
                  988
                ],
                "shape": 3,
                "label": "模型",
                "slot_index": 0
              },
              {
                "name": "ipadapter",
                "type": "IPADAPTER",
                "links": [
                  932
                ],
                "shape": 3,
                "label": "IPAdapter"
              }
            ],
            "properties": {
              "Node name for S&R": "IPAdapterUnifiedLoader"
            },
            "widgets_values": [
              "STANDARD (medium strength)"
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 590,
            "type": "ImageScaleToMegapixels",
            "pos": [
              3330,
              360
            ],
            "size": {
              "0": 315,
              "1": 78
            },
            "flags": {},
            "order": 11,
            "mode": 0,
            "inputs": [
              {
                "name": "images",
                "type": "IMAGE",
                "link": 985,
                "label": "images"
              },
              {
                "name": "upscale_model_opt",
                "type": "UPSCALE_MODEL",
                "link": null,
                "label": "upscale_model_opt"
              }
            ],
            "outputs": [
              {
                "name": "IMAGE",
                "type": "IMAGE",
                "links": [
                  986,
                  987
                ],
                "shape": 3,
                "slot_index": 0,
                "label": "IMAGE"
              }
            ],
            "properties": {
              "Node name for S&R": "ImageScaleToMegapixels"
            },
            "widgets_values": [
              0.5
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 631,
            "type": "LayerUtility: PurgeVRAM",
            "pos": [
              4410,
              710
            ],
            "size": {
              "0": 315,
              "1": 82
            },
            "flags": {},
            "order": 28,
            "mode": 0,
            "inputs": [
              {
                "name": "anything",
                "type": "*",
                "link": 1058,
                "label": "anything",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "LayerUtility: PurgeVRAM"
            },
            "widgets_values": [
              false,
              true
            ]
          },
          {
            "id": 616,
            "type": "LayerUtility: PurgeVRAM",
            "pos": [
              4820,
              710
            ],
            "size": {
              "0": 315,
              "1": 82
            },
            "flags": {},
            "order": 30,
            "mode": 0,
            "inputs": [
              {
                "name": "anything",
                "type": "*",
                "link": 1025,
                "label": "anything",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "LayerUtility: PurgeVRAM"
            },
            "widgets_values": [
              false,
              true
            ]
          },
          {
            "id": 575,
            "type": "CLIPTextEncode",
            "pos": [
              2530,
              870
            ],
            "size": {
              "0": 210,
              "1": 60
            },
            "flags": {},
            "order": 21,
            "mode": 0,
            "inputs": [
              {
                "name": "clip",
                "type": "CLIP",
                "link": 1000,
                "label": "CLIP",
                "slot_index": 0
              },
              {
                "name": "text",
                "type": "STRING",
                "link": 958,
                "widget": {
                  "name": "text"
                },
                "label": "文本"
              }
            ],
            "outputs": [
              {
                "name": "CONDITIONING",
                "type": "CONDITIONING",
                "links": [
                  959
                ],
                "shape": 3,
                "label": "条件",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "CLIPTextEncode"
            },
            "widgets_values": [
              ""
            ],
            "category": "Primitive Nodes"
          },
          {
            "id": 569,
            "type": "SDXLPromptStyler",
            "pos": [
              2030,
              780
            ],
            "size": {
              "0": 400,
              "1": 218
            },
            "flags": {},
            "order": 5,
            "mode": 0,
            "outputs": [
              {
                "name": "positive_prompt_text_g",
                "type": "STRING",
                "links": [
                  953
                ],
                "shape": 3
              },
              {
                "name": "negative_prompt_text_g",
                "type": "STRING",
                "links": [
                  958
                ],
                "shape": 3,
                "slot_index": 1
              }
            ],
            "properties": {
              "Node name for S&R": "SDXLPromptStyler"
            },
            "widgets_values": [
              ", Stickers, Sticker,simple details，empty background, black background, ",
              "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, artist name, signature, flexible deformity, (photo:1.2, 3d:1.2)",
              "base",
              "No",
              ""
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 555,
            "type": "easy pipeOut",
            "pos": [
              3770,
              810
            ],
            "size": {
              "0": 210,
              "1": 186
            },
            "flags": {},
            "order": 18,
            "mode": 0,
            "inputs": [
              {
                "name": "pipe",
                "type": "PIPE_LINE",
                "link": 934,
                "label": "节点束"
              }
            ],
            "outputs": [
              {
                "name": "pipe",
                "type": "PIPE_LINE",
                "links": null,
                "shape": 3,
                "slot_index": 0,
                "label": "节点束"
              },
              {
                "name": "model",
                "type": "MODEL",
                "links": [
                  990
                ],
                "shape": 3,
                "slot_index": 1,
                "label": "模型"
              },
              {
                "name": "pos",
                "type": "CONDITIONING",
                "links": [],
                "shape": 3,
                "slot_index": 2
              },
              {
                "name": "neg",
                "type": "CONDITIONING",
                "links": [],
                "shape": 3,
                "slot_index": 3
              },
              {
                "name": "latent",
                "type": "LATENT",
                "links": [
                  970
                ],
                "shape": 3,
                "slot_index": 4,
                "label": "Latent"
              },
              {
                "name": "vae",
                "type": "VAE",
                "links": null,
                "shape": 3
              },
              {
                "name": "clip",
                "type": "CLIP",
                "links": [
                  999,
                  1000
                ],
                "shape": 3,
                "slot_index": 6
              },
              {
                "name": "image",
                "type": "IMAGE",
                "links": null,
                "shape": 3,
                "label": "图像"
              },
              {
                "name": "seed",
                "type": "INT",
                "links": null,
                "shape": 3
              }
            ],
            "properties": {
              "Node name for S&R": "easy pipeOut"
            },
            "category": "Custom Nodes"
          },
          {
            "id": 339,
            "type": "BatchPromptSchedule",
            "pos": [
              1760,
              710
            ],
            "size": {
              "0": 250,
              "1": 330
            },
            "flags": {},
            "order": 20,
            "mode": 0,
            "inputs": [
              {
                "name": "clip",
                "type": "CLIP",
                "link": 999,
                "label": "CLIP",
                "slot_index": 0
              },
              {
                "name": "text",
                "type": "STRING",
                "link": 590,
                "widget": {
                  "name": "text"
                },
                "label": "文本"
              },
              {
                "name": "pre_text",
                "type": "STRING",
                "link": 953,
                "widget": {
                  "name": "pre_text"
                },
                "label": "预置文本",
                "slot_index": 2
              },
              {
                "name": "app_text",
                "type": "STRING",
                "link": null,
                "widget": {
                  "name": "app_text"
                },
                "label": "附加文本"
              }
            ],
            "outputs": [
              {
                "name": "POS",
                "type": "CONDITIONING",
                "links": [
                  1051
                ],
                "shape": 3,
                "slot_index": 0,
                "label": "POS"
              },
              {
                "name": "NEG",
                "type": "CONDITIONING",
                "links": [],
                "shape": 3,
                "slot_index": 1,
                "label": "NEG"
              }
            ],
            "properties": {
              "Node name for S&R": "BatchPromptSchedule"
            },
            "widgets_values": [
              "\"0\" :\"4-year-old,litte baby，kawaii,short hair \",\n\"1\" :\"14-year-old,cute kid,short hair \",\n\"2\" :\"24-year-old,young girl,long hair \",\n\"3\" :\"34-year-old,woman,long hair \",\n\"4\" :\"44-year-old,old woman\",\n\"5\" :\"64-year-old,old woman,gray hair\",\n\"6\" :\"84-year-old,old woman,white hair\",\n\"7\" :\"94-year-old,old woman,white hair\",",
              10,
              false,
              "Sticker，chibi:2,Flat:1.5,full body:2,Simple details，(Empty Background:2）",
              "man in red shirt and jacket and tie",
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 566,
            "type": "VAEDecode",
            "pos": [
              4450,
              530
            ],
            "size": {
              "0": 210,
              "1": 46
            },
            "flags": {},
            "order": 26,
            "mode": 0,
            "inputs": [
              {
                "name": "samples",
                "type": "LATENT",
                "link": 1057,
                "label": "Latent",
                "slot_index": 0
              },
              {
                "name": "vae",
                "type": "VAE",
                "link": 952,
                "label": "VAE",
                "slot_index": 1
              }
            ],
            "outputs": [
              {
                "name": "IMAGE",
                "type": "IMAGE",
                "links": [
                  1028,
                  1058,
                  1066
                ],
                "shape": 3,
                "label": "图像",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "VAEDecode"
            },
            "category": "Primitive Nodes"
          },
          {
            "id": 553,
            "type": "easy comfyLoader",
            "pos": [
              2830,
              650
            ],
            "size": {
              "0": 340,
              "1": 380
            },
            "flags": {},
            "order": 17,
            "mode": 0,
            "inputs": [
              {
                "name": "optional_lora_stack",
                "type": "LORA_STACK",
                "link": 969,
                "label": "LoRA堆（可选）"
              },
              {
                "name": "optional_controlnet_stack",
                "type": "CONTROL_NET_STACK",
                "link": null,
                "slot_index": 1
              },
              {
                "name": "positive",
                "type": "STRING",
                "link": 968,
                "widget": {
                  "name": "positive"
                },
                "label": "正面提示词"
              }
            ],
            "outputs": [
              {
                "name": "pipe",
                "type": "PIPE_LINE",
                "links": [
                  934
                ],
                "shape": 3,
                "slot_index": 0,
                "label": "节点束"
              },
              {
                "name": "model",
                "type": "MODEL",
                "links": [],
                "shape": 3,
                "slot_index": 1,
                "label": "模型"
              },
              {
                "name": "vae",
                "type": "VAE",
                "links": [],
                "shape": 3,
                "slot_index": 2
              }
            ],
            "properties": {
              "Node name for S&R": "easy comfyLoader"
            },
            "widgets_values": [
              "sd_xl_base_1.0.safetensors",
              "Baked VAE",
              -1,
              "araminta_k_midsommar_cartoon.safetensors",
              1,
              1,
              "1024 x 1024",
              512,
              512,
              "1boy, portrait, ((looking at viewer)), clear background, best quality",
              "",
              10
            ]
          },
          {
            "id": 583,
            "type": "easy loraStack",
            "pos": [
              2820,
              390
            ],
            "size": {
              "0": 380,
              "1": 154
            },
            "flags": {},
            "order": 6,
            "mode": 0,
            "inputs": [
              {
                "name": "optional_lora_stack",
                "type": "LORA_STACK",
                "link": null,
                "label": "LoRA堆（可选）"
              }
            ],
            "outputs": [
              {
                "name": "lora_stack",
                "type": "LORA_STACK",
                "links": [
                  969
                ],
                "shape": 3,
                "label": "LoRA堆",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "easy loraStack"
            },
            "widgets_values": [
              false,
              "simple",
              1,
              "贴纸/StickersRedmond.safetensors",
              1.2,
              1,
              1,
              "None",
              1,
              1,
              1,
              "None",
              1,
              1,
              1,
              "None",
              1,
              1,
              1,
              "None",
              1,
              1,
              1,
              "None",
              1,
              1,
              1,
              "None",
              1,
              1,
              1,
              "None",
              1,
              1,
              1,
              "None",
              1,
              1,
              1,
              "None",
              1,
              1,
              1
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 611,
            "type": "BRIA_RMBG_Zho",
            "pos": [
              4850,
              530
            ],
            "size": {
              "0": 210,
              "1": 46
            },
            "flags": {},
            "order": 27,
            "mode": 0,
            "inputs": [
              {
                "name": "rmbgmodel",
                "type": "RMBGMODEL",
                "link": 1020,
                "label": "rmbgmodel"
              },
              {
                "name": "image",
                "type": "IMAGE",
                "link": 1028,
                "label": "image"
              }
            ],
            "outputs": [
              {
                "name": "image",
                "type": "IMAGE",
                "links": [
                  1025,
                  1065
                ],
                "shape": 3,
                "label": "image",
                "slot_index": 0
              },
              {
                "name": "mask",
                "type": "MASK",
                "links": null,
                "shape": 3,
                "label": "mask"
              }
            ],
            "properties": {
              "Node name for S&R": "BRIA_RMBG_Zho"
            }
          },
          {
            "id": 545,
            "type": "ShowText|pysssss",
            "pos": [
              1260,
              800
            ],
            "size": {
              "0": 380,
              "1": 110
            },
            "flags": {},
            "order": 13,
            "mode": 0,
            "inputs": [
              {
                "name": "text",
                "type": "STRING",
                "link": 963,
                "widget": {
                  "name": "text"
                },
                "label": "文本"
              }
            ],
            "outputs": [
              {
                "name": "STRING",
                "type": "STRING",
                "links": [
                  1059
                ],
                "shape": 6,
                "label": "字符串",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "ShowText|pysssss"
            },
            "widgets_values": [
              "",
              " A close up of a person with short dark brown hair and brown eyes. The person is wearing a green suit jacket. The person is standing against a green\n background."
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 326,
            "type": "LoadImage",
            "pos": [
              2870,
              -320
            ],
            "size": {
              "0": 490,
              "1": 550
            },
            "flags": {
              "collapsed": false
            },
            "order": 7,
            "mode": 0,
            "outputs": [
              {
                "name": "IMAGE",
                "type": "IMAGE",
                "links": [
                  964,
                  985
                ],
                "shape": 3,
                "slot_index": 0,
                "label": "图像"
              },
              {
                "name": "MASK",
                "type": "MASK",
                "links": null,
                "shape": 3,
                "label": "遮罩"
              }
            ],
            "properties": {
              "Node name for S&R": "LoadImage"
            },
            "widgets_values": [
              "9fb8ace47db5016d6d5d88a0a9d6c8c2.jpg",
              "image"
            ],
            "category": "Primitive Nodes"
          },
          {
            "id": 618,
            "type": "CR Simple Prompt List",
            "pos": [
              2390,
              -360
            ],
            "size": [
              320,
              590
            ],
            "flags": {},
            "order": 12,
            "mode": 0,
            "inputs": [
              {
                "name": "simple_prompt_list",
                "type": "SIMPLE_PROMPT_LIST",
                "link": 1026,
                "label": "提示词列表(简易)"
              }
            ],
            "outputs": [
              {
                "name": "SIMPLE_PROMPT_LIST",
                "type": "SIMPLE_PROMPT_LIST",
                "links": [
                  1027
                ],
                "shape": 3,
                "label": "提示词列表(简易)",
                "slot_index": 0
              },
              {
                "name": "show_help",
                "type": "STRING",
                "links": [],
                "shape": 3,
                "label": "显示帮助",
                "slot_index": 1
              }
            ],
            "properties": {
              "Node name for S&R": "CR Simple Prompt List"
            },
            "widgets_values": [
              "Put a headphone on your head and listen to music，Half-length photo",
              "Reading with a book in hand, focusing on reading",
              "Holding a cup of coffee",
              "holding sunflower in hand",
              "waving hello"
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 617,
            "type": "CR Simple Prompt List",
            "pos": [
              2050,
              -350
            ],
            "size": [
              320,
              580
            ],
            "flags": {},
            "order": 8,
            "mode": 0,
            "inputs": [
              {
                "name": "simple_prompt_list",
                "type": "SIMPLE_PROMPT_LIST",
                "link": null,
                "label": "提示词列表(简易)"
              }
            ],
            "outputs": [
              {
                "name": "SIMPLE_PROMPT_LIST",
                "type": "SIMPLE_PROMPT_LIST",
                "links": [
                  1026
                ],
                "shape": 3,
                "label": "提示词列表(简易)",
                "slot_index": 0
              },
              {
                "name": "show_help",
                "type": "STRING",
                "links": [],
                "shape": 3,
                "label": "显示帮助",
                "slot_index": 1
              }
            ],
            "properties": {
              "Node name for S&R": "CR Simple Prompt List"
            },
            "widgets_values": [
              "prompt",
              "Holding a cute shaped balloon",
              "Holding a cat in my arms",
              "Happy eating tomatoes",
              "Holding a red heart-shaped pillow in hand，smile，"
            ],
            "category": "Custom Nodes"
          },
          {
            "id": 578,
            "type": "Gemini_API_Zho",
            "pos": [
              1250,
              340
            ],
            "size": {
              "0": 390,
              "1": 400
            },
            "flags": {},
            "order": 10,
            "mode": 0,
            "inputs": [
              {
                "name": "image",
                "type": "IMAGE",
                "link": 964,
                "label": "image",
                "slot_index": 0
              }
            ],
            "outputs": [
              {
                "name": "text",
                "type": "STRING",
                "links": [
                  963,
                  1022
                ],
                "shape": 3,
                "label": "text",
                "slot_index": 0
              }
            ],
            "properties": {
              "Node name for S&R": "Gemini_API_Zho"
            },
            "widgets_values": [
              "Ignore the artistic style of the picture.\n\nDescribe the person in detail, including any interesting features or characteristics, such as gender, age, facial expression, race, color, hairstyle, hair color, hat, eye color, beard. \n\nIf it is wearing glasses, describe the style of glasses.\n\nDo not describe anything else, such as background.\n\nPlease create an image generation prompt in English less than 46 words to fit the description above. Output the prompt, do not output anything else.",
              "gemini-pro-vision",
              true,
              ""
            ]
          },
          {
            "id": 632,
            "type": "Note",
            "pos": [
              740,
              310
            ],
            "size": {
              "0": 410,
              "1": 390
            },
            "flags": {},
            "order": 9,
            "mode": 0,
            "properties": {
              "text": ""
            },
            "widgets_values": [
              "This is a workflow that can be used as both a character portrait and a sticker。It should be noted that removing the background sometimes does not work well, it is recommended to use a pure black background。\n\n\n👀Gemini API:\n\nhttps://ai.google.dev/gemini-api?gad_source=1&gclid=Cj0KCQjwhb60BhClARIsABGGtw844VanShqGX1UhDxsoQ-IygiAb48_dTvmPiZ-aGrcXekNG_3FHJBAaAkIlEALw_wcB&hl=zh-cn\n\n🌟checkpoint:\n\nhttps://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/sd_xl_base_1.0.safetensors\n\n\n🌙Lora：\n\nStickers.Redmond \n\nhttps://civitai.com/models/144142?modelVersionId=160130\n\nmidsommarcartoon\n\nhttps://huggingface.co/alvdansen/midsommarcartoon/tree/main\n\n\n🍃WeChat：idsuperyao"
            ],
            "color": "#432",
            "bgcolor": "#653",
            "category": "Official"
          },
          {
            "id": 637,
            "type": "PreviewImage",
            "pos": [
              4300,
              -330
            ],
            "size": [
              810,
              550
            ],
            "flags": {},
            "order": 31,
            "mode": 0,
            "inputs": [
              {
                "name": "images",
                "type": "IMAGE",
                "link": 1065,
                "label": "图像"
              }
            ],
            "title": "Sticker",
            "properties": {
              "Node name for S&R": "PreviewImage"
            },
            "category": "Primitive Nodes"
          },
          {
            "id": 638,
            "type": "PreviewImage",
            "pos": [
              3490,
              -320
            ],
            "size": [
              670,
              550
            ],
            "flags": {},
            "order": 29,
            "mode": 0,
            "inputs": [
              {
                "name": "images",
                "type": "IMAGE",
                "link": 1066,
                "label": "图像",
                "slot_index": 0
              }
            ],
            "title": "Portrait",
            "properties": {
              "Node name for S&R": "PreviewImage"
            },
            "category": "Primitive Nodes"
          }
        ],
        "links": [
          [
            438,
            251,
            1,
            48,
            0,
            "CLIP"
          ],
          [
            439,
            36,
            0,
            268,
            4,
            "MODEL"
          ],
          [
            440,
            4,
            2,
            238,
            4,
            "VAE"
          ],
          [
            441,
            4,
            2,
            239,
            4,
            "VAE"
          ],
          [
            442,
            251,
            1,
            270,
            0,
            "CLIP"
          ],
          [
            443,
            36,
            0,
            226,
            3,
            "MODEL"
          ],
          [
            590,
            314,
            0,
            339,
            1,
            "STRING"
          ],
          [
            659,
            317,
            1,
            312,
            0,
            "CLIP"
          ],
          [
            660,
            307,
            0,
            382,
            4,
            "MODEL"
          ],
          [
            661,
            317,
            1,
            339,
            0,
            "CLIP"
          ],
          [
            662,
            305,
            2,
            378,
            4,
            "VAE"
          ],
          [
            663,
            307,
            0,
            347,
            0,
            "MODEL"
          ],
          [
            664,
            305,
            2,
            328,
            4,
            "VAE"
          ],
          [
            780,
            406,
            1,
            312,
            0,
            "CLIP"
          ],
          [
            781,
            305,
            2,
            378,
            4,
            "VAE"
          ],
          [
            782,
            406,
            1,
            339,
            0,
            "CLIP"
          ],
          [
            783,
            307,
            0,
            382,
            4,
            "MODEL"
          ],
          [
            784,
            307,
            0,
            347,
            0,
            "MODEL"
          ],
          [
            785,
            305,
            2,
            328,
            4,
            "VAE"
          ],
          [
            817,
            406,
            1,
            312,
            0,
            "CLIP"
          ],
          [
            818,
            305,
            2,
            378,
            4,
            "VAE"
          ],
          [
            819,
            406,
            1,
            339,
            0,
            "CLIP"
          ],
          [
            820,
            307,
            0,
            382,
            4,
            "MODEL"
          ],
          [
            821,
            307,
            0,
            347,
            0,
            "MODEL"
          ],
          [
            822,
            305,
            2,
            328,
            4,
            "VAE"
          ],
          [
            906,
            406,
            1,
            312,
            0,
            "CLIP"
          ],
          [
            907,
            307,
            0,
            382,
            4,
            "MODEL"
          ],
          [
            908,
            307,
            0,
            347,
            0,
            "MODEL"
          ],
          [
            909,
            305,
            2,
            378,
            4,
            "VAE"
          ],
          [
            910,
            406,
            1,
            339,
            0,
            "CLIP"
          ],
          [
            911,
            305,
            2,
            328,
            4,
            "VAE"
          ],
          [
            916,
            406,
            1,
            312,
            0,
            "CLIP"
          ],
          [
            917,
            307,
            0,
            347,
            0,
            "MODEL"
          ],
          [
            918,
            406,
            1,
            339,
            0,
            "CLIP"
          ],
          [
            919,
            307,
            0,
            382,
            4,
            "MODEL"
          ],
          [
            920,
            305,
            2,
            378,
            4,
            "VAE"
          ],
          [
            921,
            305,
            2,
            328,
            4,
            "VAE"
          ],
          [
            932,
            554,
            1,
            552,
            1,
            "IPADAPTER"
          ],
          [
            934,
            553,
            0,
            555,
            0,
            "PIPE_LINE"
          ],
          [
            940,
            559,
            0,
            556,
            3,
            "SAMPLER"
          ],
          [
            942,
            561,
            0,
            556,
            4,
            "SIGMAS"
          ],
          [
            948,
            552,
            0,
            558,
            0,
            "MODEL"
          ],
          [
            952,
            568,
            0,
            566,
            1,
            "VAE"
          ],
          [
            953,
            569,
            0,
            339,
            2,
            "STRING"
          ],
          [
            958,
            569,
            1,
            575,
            1,
            "STRING"
          ],
          [
            959,
            575,
            0,
            556,
            2,
            "CONDITIONING"
          ],
          [
            963,
            578,
            0,
            545,
            0,
            "STRING"
          ],
          [
            964,
            326,
            0,
            578,
            0,
            "IMAGE"
          ],
          [
            968,
            580,
            0,
            553,
            2,
            "STRING"
          ],
          [
            969,
            583,
            0,
            553,
            0,
            "LORA_STACK"
          ],
          [
            970,
            555,
            4,
            556,
            5,
            "LATENT"
          ],
          [
            985,
            326,
            0,
            590,
            0,
            "IMAGE"
          ],
          [
            986,
            590,
            0,
            552,
            2,
            "IMAGE"
          ],
          [
            987,
            590,
            0,
            552,
            3,
            "IMAGE"
          ],
          [
            988,
            554,
            0,
            552,
            0,
            "MODEL"
          ],
          [
            990,
            555,
            1,
            554,
            0,
            "MODEL"
          ],
          [
            999,
            555,
            6,
            339,
            0,
            "CLIP"
          ],
          [
            1000,
            555,
            6,
            575,
            0,
            "CLIP"
          ],
          [
            1020,
            610,
            0,
            611,
            0,
            "RMBGMODEL"
          ],
          [
            1022,
            578,
            0,
            613,
            0,
            "*"
          ],
          [
            1023,
            556,
            0,
            615,
            0,
            "*"
          ],
          [
            1025,
            611,
            0,
            616,
            0,
            "*"
          ],
          [
            1026,
            617,
            0,
            618,
            0,
            "SIMPLE_PROMPT_LIST"
          ],
          [
            1027,
            618,
            0,
            314,
            0,
            "SIMPLE_PROMPT_LIST"
          ],
          [
            1028,
            566,
            0,
            611,
            1,
            "IMAGE"
          ],
          [
            1051,
            339,
            0,
            556,
            1,
            "CONDITIONING"
          ],
          [
            1056,
            558,
            0,
            556,
            0,
            "MODEL"
          ],
          [
            1057,
            556,
            0,
            566,
            0,
            "LATENT"
          ],
          [
            1058,
            566,
            0,
            631,
            0,
            "*"
          ],
          [
            1059,
            545,
            0,
            580,
            1,
            "STRING"
          ],
          [
            1060,
            579,
            0,
            580,
            0,
            "STRING"
          ],
          [
            1065,
            611,
            0,
            637,
            0,
            "IMAGE"
          ],
          [
            1066,
            566,
            0,
            638,
            0,
            "IMAGE"
          ]
        ],
        "groups": [
          {
            "title": "VLM",
            "bounding": [
              1180,
              270,
              530,
              790
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "Model&LoRA",
            "bounding": [
              2720,
              270,
              540,
              790
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "IPAdapter",
            "bounding": [
              3270,
              270,
              450,
              790
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "Ksampler",
            "bounding": [
              3730,
              270,
              650,
              790
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "VAE",
            "bounding": [
              4390,
              270,
              370,
              790
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "RMBG",
            "bounding": [
              4770,
              270,
              380,
              790
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "Input-Prompt",
            "bounding": [
              1990,
              -420,
              780,
              680
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "Input-Image",
            "bounding": [
              2780,
              -420,
              630,
              680
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "Output-Stickers",
            "bounding": [
              4260,
              -420,
              880,
              680
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "Prompt",
            "bounding": [
              1720,
              270,
              990,
              790
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          },
          {
            "title": "Output-Portrait",
            "bounding": [
              3420,
              -420,
              830,
              680
            ],
            "color": "#3f789e",
            "font_size": 24,
            "locked": false
          }
        ],
        "config": {},
        "extra": {
          "groupNodes": {},
          "ds": {
            "scale": 0.6209213230591553,
            "offset": [
              -2809.287961596689,
              517.6766451630192
            ]
          },
          "0246.VERSION": [
            0,
            0,
            4
          ]
        },
        "version": 0.4
      },
      "params": {
        "photo": {
          "name": "头像",
          "type": "image",
          "default": "",
          "description": "图片，建议真人肖像",
          "required": true,
          "position_node_id": "22",
          "position_input_name": "image"
        }
      }
    },
    "render": "ComfyUI",
    "online_status": 1
  }
];