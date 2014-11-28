#version 150

// Task_1_4 - ToDo Begin

uniform mat4 transform;
uniform sampler2D height;

in vec3 a_vertex;

// out ... ;

void main()
{
	// Note: start with a copy of your 1_3 shader and add the lambert term 
	// based on a static light source (use const variable)...

	// ToDo: you need to retrieve a normal, which can be done with 
	// a single cross product of two normalized vectors... so just
	// find two vectors that are sufficient for correct light impression.
	// (It is not required to be absolutely physically correct, but only
	// to depend on the terrains slope.

	gl_Position = transform * vec4(a_vertex, 1.0);
	
	// Task_1_4 - ToDo End
}
