#version 140
#define PI 3.1415926535897932384626433832795

uniform sampler2D envmap;
uniform samplerCube cubemap;

uniform int mapping;
uniform float timef;

out vec4 fragColor;

in vec3 v_normal;
in vec3 v_eye;


// Task_2_2 - ToDo Begin

// Copy your env function from 2_1

vec4 env(in vec3 eye)
{
	vec4 color;
	
	if(0 == mapping) 		// cube
	{
		// use texture function with the cubemap sampler
		color = vec4(texture(cubemap, eye).xyz, 1.0); // ensures alpha of 1.0
	}
	else if(1 == mapping) 	// polar
	{	
		// use texture function with the envmap sampler
		float u = 0.5 - (0.5/PI * atan(eye.x, eye.z));
		float v = 1.0 - (2.0/PI * asin(eye.y));
		vec4 color_env = vec4(texture(envmap, vec2(u, v)).xyz, 1.0);
		vec4 color_clamp = vec4(0.40, 0.55, 0.62, 1.0);
		color = mix(color_env, color_clamp, smoothstep(0.95, 1.0, v));
	}	
	else if(2 == mapping) 	// paraboloid
	{
		// use texture function with the envmap sampler
		float m = 2.0 + 2.0 * eye.y;
		float u = 0.5 + eye.x/m;
		float v = 0.5 + eye.z/m;
		color = vec4(texture(envmap, vec2(u, v)).xyz, 1.0);
	}
	else if(3 == mapping) 	// sphere
	{
		// use texture function with the envmap sampler
		float m = 2.0 * sqrt(pow(eye.x, 2) + pow(eye.y, 2) + pow((1.0 - eye.z), 2)); 
		float u = 0.5 + eye.x/m;
		float v = 0.5 - eye.y/m;
		color = vec4(texture(envmap, vec2(u, v)).xyz, 1.0);
	}
	return color;
}

void main()
{
	vec3 n = normalize(v_normal);
	vec3 e = normalize(v_eye);
	
	vec3 light = normalize(vec3(-8, -1, 8));
	vec3 h = normalize((e + light) * 0.5);
	
	float glass_brechungskoeffizient = 1.48;
	float luft_brechungskoeffizient = 1.0002;
	
	//float frsl = (1 - dot(r, n)) * ((pow(sin(dot(r, n)), 2)) / (pow(sin(dot(q, n)), 2))) * r;

	float g = pow(((glass_brechungskoeffizient - luft_brechungskoeffizient) / (glass_brechungskoeffizient + luft_brechungskoeffizient)),2);

	vec3 r = reflect(e, n);
	vec3 q = refract(e, n, luft_brechungskoeffizient / glass_brechungskoeffizient);
	
    float frsl = g + (1 - g) * pow(1-dot(h,e),5);
	
	vec4 refl = env(r);
	vec4 refr = env(q);
	
	//fragColor = vec4(frsl, frsl, frsl, 1.0);
	fragColor = mix(refl, refr, frsl);
}

// Task_2_2 - ToDo End
