#version 150

uniform sampler2D ground;

out vec4 fragColor;

in float vert_height;
in vec2 tex_coords;
in vec3 normal;

// Task_1_3 - ToDo Begin

// Note: you can specify consts instead of uniforms or local variables...

//const float t = 1.0;

void main()
{
	// Implement height based texturing using a texture atlas
	// with known structure ;)
	
	// Tip: start with getting the height from the vertex stage 
	// and think of a function that yields you the two texture "indices".
	// These "indices" can be used as offset when accessing the texture...
	// Tip: again, checkout step, clamp, mod, and smoothstep!

	// ...
	
	float interpl;						//hier wird die Interpolation abhängig von der Höhe gespeichert.
	float type;							//gibt an auf welche Textur zugegriffen werden soll
	
	if (vert_height > 0.3){
		type = 0;
		interpl = smoothstep(0.3, 0.5, vert_height);
	} else if (vert_height < 0.30 && vert_height > 0.15){
		type = 0.25;
		interpl = smoothstep(0.15, 0.3, vert_height);
	} else {
		type = 0.5;
		interpl = smoothstep(0.0, 0.15, vert_height);
	}
	
	vec4 tex_color = texture(ground, vec2(mod(tex_coords.x, 0.25) + type, mod(tex_coords.y * 4, 1)));				//durch die Multiplikation und die Modulofunktion wird die Textur skaliert
	
	vec4 tex_color2 = texture(ground, vec2(mod(tex_coords.x, 0.25) + type + 0.25, mod(tex_coords.y * 4, 1)));		//der Bereich ist um eine Texturteil im Texturatlas verschoben, sodass später zwischen beiden Interpoliert werden kann
	
	float shadow = dot(-normal, vec3(0.0, 1.0, 0.0));
	
	// Note: its ok if you have minimal seams..., you need not to apply
	// mipmaps not to use safe margins to avoid those seems. 
	
	// ...
	
	// Note: feel free to scale the textures as it pleases you.
	
	// ...
	
	//float i = ... ;
	//fragColor = mix(texture(ground, uv0), texture2D(ground, uv1), i);
	
	shadow = smoothstep(-0.12, 0.3, shadow);																		//lässt den Schatten auf flachen Flächen verschwinden
	
	fragColor = vec4(mix(tex_color2.xyz, tex_color.xyz, interpl) * shadow, 1.0);									//mischen der beiden Texturwerte anhand des vorher berechneten Interpolationswertes
	
	// Task_1_3 - ToDo End
}


