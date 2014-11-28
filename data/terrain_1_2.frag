#version 150

out vec4 fragColor;

// Task_1_2 - ToDo Begin

in float tex ;

void main()
{
	// Apply a procedural texture here.

	// Tip: start with getting the height from the vertex stage 
	// and think of a function that yields iso lines.
	// Tip: checkout step, clamp, and mod

	float i = tex;
	if (mod(tex, 0.1)*10 < 0.1){			//es wird auf "sehr dunkle" Gebiete an der Grenze der Wiederholungsübergänge geprüft, sodass an diesen Stellen eine Isolinie zu sehen ist
		i = 0.1;
	}
	
	fragColor = vec4(vec3(i), 1.0);
	
	// Task_1_2 - ToDo End 
}
