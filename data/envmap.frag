#version 140
#define PI 3.1415926535897932384626433832795

uniform sampler2D envmap;
uniform samplerCube cubemap;

uniform int mapping;

out vec4 fragColor;

in vec3 v_eye;

// Task_2_1 - ToDo Begin
// Implement the four requested projection mappings.

// const float c_...  = ...;

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

// Task_2_1 - ToDo End


void main()
{
	vec3 eye = normalize(v_eye);
	vec4 color = env(eye);
	
	fragColor = color;
}
